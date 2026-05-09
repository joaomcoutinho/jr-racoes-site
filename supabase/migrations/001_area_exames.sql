-- =============================================
-- ÁREA DE EXAMES — JR Rações
-- Cole este SQL no SQL Editor do Supabase
-- =============================================

-- 1. Tabela de perfis (clientes e admin)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'cliente' CHECK (role IN ('admin', 'cliente')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de pets
CREATE TABLE IF NOT EXISTS pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de exames
CREATE TABLE IF NOT EXISTS exames (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE NOT NULL,
  descricao TEXT NOT NULL,
  data_exame DATE NOT NULL,
  tipo TEXT,
  observacoes TEXT,
  arquivo_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE exames ENABLE ROW LEVEL SECURITY;

-- Profiles: admin vê tudo, cliente vê só o próprio
CREATE POLICY "Admin vê todos os perfis"
  ON profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

CREATE POLICY "Cliente vê próprio perfil"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Pets: admin vê tudo, cliente vê só os seus
CREATE POLICY "Admin gerencia todos os pets"
  ON pets FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

CREATE POLICY "Cliente vê seus pets"
  ON pets FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

-- Exames: admin vê tudo, cliente vê só os dos seus pets
CREATE POLICY "Admin gerencia todos os exames"
  ON exames FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

CREATE POLICY "Cliente vê exames dos seus pets"
  ON exames FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = exames.pet_id
        AND pets.owner_id = auth.uid()
    )
  );

-- =============================================
-- STORAGE — bucket 'exames'
-- Execute no SQL Editor do Supabase:
-- =============================================
-- Criar bucket (ou faça pelo painel em Storage > New Bucket)
INSERT INTO storage.buckets (id, name, public)
VALUES ('exames', 'exames', true)
ON CONFLICT DO NOTHING;

-- Política de leitura: cliente lê seus próprios arquivos
-- (como o bucket é público, clientes com o link conseguem ver —
--  se quiser privado, mude public para false e ajuste as policies abaixo)

-- =============================================
-- CRIAR CONTA ADMIN
-- Após rodar este SQL, vá em Authentication > Users no painel
-- do Supabase e crie um usuário com o e-mail e senha do admin.
-- Depois execute:
-- =============================================
-- INSERT INTO profiles (id, nome, cpf, role)
-- VALUES ('<uuid-do-usuario-admin>', 'Admin JR Rações', '00000000000', 'admin');
