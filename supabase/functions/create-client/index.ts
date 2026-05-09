import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return new Response(JSON.stringify({ error: 'Não autorizado.' }), { status: 401, headers: corsHeaders })

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('ADMIN_KEY') ?? ''

    const { nome, cpf, nomePet } = await req.json()
    if (!nome || !cpf || !nomePet) return new Response(JSON.stringify({ error: 'Campos obrigatórios: nome, cpf, nomePet.' }), { status: 400, headers: corsHeaders })

    const cpfLimpo = cpf.replace(/\D/g, '')
    const email = `${cpfLimpo}@jrracoes.com`

    // Cria o usuário direto na API REST do Supabase Auth (mais confiável em Edge Functions)
    const authRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({ email, password: cpfLimpo, email_confirm: true }),
    })

    const authData = await authRes.json()
    if (!authRes.ok) {
      if (authData?.msg?.includes('already registered') || authData?.code === 'email_exists') {
        return new Response(JSON.stringify({ error: 'Este CPF já está cadastrado.' }), { status: 409, headers: corsHeaders })
      }
      throw new Error(authData?.msg ?? authData?.message ?? 'Erro ao criar usuário no Auth.')
    }

    const newUserId = authData.id

    // Client com service role para inserir nas tabelas
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    // Cria o perfil
    const { error: profileError } = await supabaseAdmin.from('profiles').insert({
      id: newUserId,
      nome: nome.trim(),
      cpf: cpfLimpo,
      role: 'cliente',
    })
    if (profileError) throw profileError

    // Cria o primeiro pet
    const { error: petError } = await supabaseAdmin.from('pets').insert({
      owner_id: newUserId,
      nome: nomePet.trim(),
    })
    if (petError) throw petError

    return new Response(
      JSON.stringify({ success: true, clienteId: newUserId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message ?? 'Erro interno.' }),
      { status: 500, headers: corsHeaders }
    )
  }
})
