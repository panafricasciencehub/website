import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Article = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  youtube_url: string | null;
  excerpt: string;
  read_time: string;
  html_content: string;
  created_at: string;
};

function getYouTubeEmbed(url: string | null): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
      setArticle(data as Article | null);
      setLoading(false);
    })();
  }, [id]);

  const embed = getYouTubeEmbed(article?.youtube_url ?? null);
  const html = article?.html_content || "";
  const contentParts = embed && html.includes("[youtube]") ? html.split("[youtube]") : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="font-montserrat text-2xl">pash</Link>
          <Link to="/articles" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
            ← All Articles
          </Link>
        </div>
      </header>

      {loading ? (
        <p className="container mx-auto px-6 py-20 text-center text-muted-foreground">Loading…</p>
      ) : !article ? (
        <p className="container mx-auto px-6 py-20 text-center text-muted-foreground">Article not found.</p>
      ) : (
        <article className="container mx-auto px-6 py-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground">{article.read_time}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">{article.title}</h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">{article.excerpt}</p>
          <div className="aspect-video rounded-2xl overflow-hidden mb-10 elevated-shadow">
            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
          </div>

          {embed && !contentParts && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-10 elevated-shadow">
              <iframe
                src={embed}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          <div className="article-prose">
            {contentParts ? (
              <>
                <div dangerouslySetInnerHTML={{ __html: contentParts[0] }} />
                <div className="aspect-video rounded-2xl overflow-hidden my-10 elevated-shadow">
                  <iframe
                    src={embed!}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div dangerouslySetInnerHTML={{ __html: contentParts.slice(1).join("[youtube]") }} />
              </>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            )}
          </div>
        </article>
      )}
    </div>
  );
}
