CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  youtube_url TEXT,
  read_time TEXT NOT NULL DEFAULT '5 min read',
  excerpt TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  html_content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Anyone can insert articles" ON public.articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update articles" ON public.articles FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete articles" ON public.articles FOR DELETE USING (true);

CREATE INDEX idx_articles_created_at ON public.articles(created_at DESC);
CREATE INDEX idx_articles_featured ON public.articles(featured) WHERE featured = true;