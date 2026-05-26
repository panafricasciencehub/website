import { useEffect, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Youtube, Save, Trash2, Pencil, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "K9mP2xQ7nR4tW8vL3yJ6sB1dF5hG0aZc";
const STORAGE_KEY = "pash_admin_authed";

const CATEGORIES = ["Behind the Scenes", "Industry Insights", "Production", "Team", "Tutorials", "News"];

const TEMPLATE = `<h1>Main Heading</h1>
<p>Regular paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
<h2>Secondary Heading</h2>
<p>Link example: <a href="https://example.com">Click here</a></p>
<img src="https://example.com/image.jpg" alt="Example image" />
<h3>Third Level Heading</h3>
<ul>
  <li>List item one</li>
  <li>List item two</li>
</ul>`;

type Article = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  youtube_url: string | null;
  read_time: string;
  excerpt: string;
  featured: boolean;
  html_content: string;
  created_at: string;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

const emptyForm = {
  title: "",
  category: "",
  image_url: "",
  youtube_url: "",
  read_time: "5 min read",
  excerpt: "",
  featured: false,
  html_content: "",
};

export default function Admin() {
  const { toast } = useToast();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [viewTab, setViewTab] = useState<"articles" | "messages">("articles");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) {
      loadArticles();
      loadMessages();
    }
  }, [authed]);

  async function loadArticles() {
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    setArticles((data as Article[]) || []);
  }

  async function loadMessages() {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages((data as Message[]) || []);
  }

  async function handleDeleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting", variant: "destructive" });
      return;
    }
    toast({ title: "Message deleted" });
    loadMessages();
  }

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
      toast({ title: "Welcome, admin" });
    } else {
      toast({ title: "Incorrect password", variant: "destructive" });
    }
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
  }

  function startNew() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setTab("edit");
  }

  function startEdit(a: Article) {
    setEditingId(a.id);
    setForm({
      title: a.title,
      category: a.category,
      image_url: a.image_url,
      youtube_url: a.youtube_url || "",
      read_time: a.read_time,
      excerpt: a.excerpt,
      featured: a.featured,
      html_content: a.html_content,
    });
    setShowForm(true);
    setTab("edit");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.title || !form.category || !form.image_url || !form.excerpt || !form.html_content) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const payload = {
      ...form,
      youtube_url: form.youtube_url || null,
      updated_at: new Date().toISOString(),
    };
    const { error } = editingId
      ? await supabase.from("articles").update(payload).eq("id", editingId)
      : await supabase.from("articles").insert(payload);
    setSubmitting(false);
    if (error) {
      toast({ title: "Error saving article", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editingId ? "Article updated" : "Article published" });
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    loadArticles();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting", variant: "destructive" });
      return;
    }
    toast({ title: "Article deleted" });
    loadArticles();
  }

  // === Login screen ===
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-card clean-border elevated-shadow rounded-3xl p-10">
          <div className="text-center mb-8">
            <Link to="/" className="font-montserrat text-3xl block mb-2">pash</Link>
            <h1 className="text-2xl font-black">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-2">Enter the 32-character admin password</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-foreground text-background font-black hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-6">
            Lost the password? Ask your developer to regenerate it.
          </p>
        </div>
      </div>
    );
  }

  // === Admin dashboard ===
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-montserrat text-2xl">pash</Link>
            <span className="text-sm text-muted-foreground hidden sm:inline">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/articles" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
              View site
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-semibold hover:bg-card transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10">
        <div className="flex gap-8 mb-8 border-b border-border pb-4">
          <button 
            onClick={() => { setViewTab("articles"); setShowForm(false); }}
            className={`font-black text-xl transition-colors ${viewTab === "articles" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"}`}
          >
            Articles
          </button>
          <button 
            onClick={() => { setViewTab("messages"); setShowForm(false); }}
            className={`font-black text-xl transition-colors flex items-center gap-2 ${viewTab === "messages" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"}`}
          >
            Messages
            {messages.length > 0 && <span className="text-xs bg-accent-emerald text-white px-2 py-1 rounded-full">{messages.length}</span>}
          </button>
        </div>

        {viewTab === "messages" && !showForm ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-black mb-1">Inbox</h1>
                <p className="text-muted-foreground">{messages.length} total messages</p>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-2xl clean-border">
                <p className="text-muted-foreground mb-4">No messages yet. Check back later.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {messages.map((m) => (
                  <div key={m.id} className="p-6 bg-card rounded-2xl clean-border flex flex-col sm:flex-row gap-6 justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-black text-lg">{m.name}</h3>
                        <a href={`mailto:${m.email}`} className="text-sm font-semibold text-accent-blue hover:underline">
                          {m.email}
                        </a>
                      </div>
                      <p className="text-muted-foreground whitespace-pre-wrap">{m.message}</p>
                      <p className="text-xs text-muted-foreground mt-4 opacity-60">
                        {new Date(m.created_at).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(m.id)}
                      className="p-2 shrink-0 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : !showForm ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-black mb-1">Articles</h1>
                <p className="text-muted-foreground">{articles.length} total</p>
              </div>
              <button
                onClick={startNew}
                className="px-5 py-3 rounded-xl bg-foreground text-background font-bold hover:opacity-90 transition"
              >
                + New Article
              </button>
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-2xl clean-border">
                <p className="text-muted-foreground mb-4">No articles yet. Create your first one.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {articles.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-4 p-4 bg-card rounded-2xl clean-border"
                  >
                    <img src={a.image_url} alt={a.title} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-accent-blue">
                          {a.category}
                        </span>
                        {a.featured && (
                          <span className="text-xs font-bold uppercase tracking-wider text-accent-emerald">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-black truncate">{a.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{a.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(a)}
                        className="p-2 rounded-lg hover:bg-background transition"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // === Form ===
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-card clean-border rounded-3xl p-8 lg:p-10 space-y-6">
            <h1 className="text-2xl font-black mb-4">
              {editingId ? "Edit Article" : "New Article"}
            </h1>

            <Field label="Title" required>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="form-input"
              />
            </Field>

            <Field label="Category" required>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="form-input"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Image URL" required>
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="form-input"
              />
            </Field>

            <Field
              label={
                <span className="inline-flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-red-500" /> YouTube Embed URL
                </span>
              }
            >
              <input
                type="url"
                value={form.youtube_url}
                onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=EXAMPLE"
                className="form-input"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Add a YouTube video URL. Use [youtube] in content to position the embed, or it will be added at the top.
              </p>
            </Field>

            <Field label="Read Time" required>
              <input
                type="text"
                value={form.read_time}
                onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                placeholder="5 min read"
                className="form-input"
              />
            </Field>

            <Field label="Excerpt/Summary" required>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={3}
                className="form-input resize-y"
              />
            </Field>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm font-semibold">Feature this article on homepage</span>
            </label>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold">HTML Content <span className="text-destructive">*</span></label>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, html_content: TEMPLATE })}
                  className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-background transition font-semibold"
                >
                  Insert Template
                </button>
              </div>
              <div className="flex gap-1 mb-2">
                <button
                  type="button"
                  onClick={() => setTab("edit")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${tab === "edit" ? "bg-background border border-border" : "text-muted-foreground"
                    }`}
                >
                  Edit HTML
                </button>
                <button
                  type="button"
                  onClick={() => setTab("preview")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${tab === "preview" ? "bg-background border border-border" : "text-muted-foreground"
                    }`}
                >
                  Quick Preview
                </button>
              </div>
              {tab === "edit" ? (
                <textarea
                  value={form.html_content}
                  onChange={(e) => setForm({ ...form, html_content: e.target.value })}
                  rows={14}
                  className="form-input font-mono text-sm resize-y"
                  placeholder={TEMPLATE}
                />
              ) : (
                <div
                  className="form-input min-h-[300px] article-prose"
                  dangerouslySetInnerHTML={{ __html: form.html_content || "<em>Nothing to preview</em>" }}
                />
              )}
              <div className="text-xs text-muted-foreground mt-2 space-y-0.5">
                <p>You can use any HTML tags for rich formatting. Common tags include:</p>
                <p>• Headings: &lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;</p>
                <p>• Text: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;a href=""&gt;</p>
                <p>• Lists: &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</p>
                <p>• Images: &lt;img src="" alt="" /&gt;</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
                className="px-5 py-2.5 rounded-xl border border-border font-semibold hover:bg-background transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue text-white font-bold hover:opacity-90 transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {submitting ? "Saving…" : editingId ? "Update Post" : "Publish Post"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}
