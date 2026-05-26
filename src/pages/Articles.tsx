import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Article = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  excerpt: string;
  read_time: string;
  featured: boolean;
  created_at: string;
};

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("articles")
        .select("id,title,category,image_url,excerpt,read_time,featured,created_at")
        .order("created_at", { ascending: false });
      setArticles((data as Article[]) || []);
      setLoading(false);
    })();
  }, []);

  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];
  const filtered =
    activeCategory === "All" ? articles : articles.filter((a) => a.category === activeCategory);
  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="font-montserrat text-2xl">pash</Link>
          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition">Home</Link>
            <Link to="/articles" className="text-foreground">Articles</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-accent-purple/5 to-accent-emerald/10" />
        <div className="absolute top-20 left-20 w-4 h-4 bg-accent-blue rounded-full float-gentle opacity-60" />
        <div className="absolute bottom-20 right-32 w-5 h-5 bg-accent-purple rounded-full drift-right opacity-50" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">Stories & Insights</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          <h1 className="font-montserrat text-5xl sm:text-6xl lg:text-7xl mb-6 text-shadow-strong">
            Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Behind-the-scenes stories, craft notes, and dispatches from the pash studio.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-24">
        {/* Category pills */}
        {!loading && articles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${activeCategory === c
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-center text-muted-foreground">Loading…</p>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-black mb-3">No articles yet</p>
            <p className="text-muted-foreground mb-6">Sign in to the admin panel to publish your first story.</p>
            <Link to="/admin" className="inline-block px-6 py-3 rounded-xl bg-foreground text-background font-bold">
              Go to Admin
            </Link>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Link
                to={`/articles/${featured.id}`}
                className="block mb-16 group rounded-3xl overflow-hidden clean-border elevated-shadow bg-card"
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto overflow-hidden bg-muted">
                    <img
                      src={featured.image_url}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-bold uppercase tracking-wider">
                        {featured.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{featured.read_time}</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-black mb-4 group-hover:text-accent-blue transition">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">{featured.excerpt}</p>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((a) => (
                <Link
                  key={a.id}
                  to={`/articles/${a.id}`}
                  className="group rounded-2xl overflow-hidden clean-border bg-card subtle-shadow hover:elevated-shadow transition"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={a.image_url}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald text-xs font-bold uppercase tracking-wider">
                        {a.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{a.read_time}</span>
                    </div>
                    <h3 className="text-xl font-black mb-2 group-hover:text-accent-blue transition">{a.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">{a.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
