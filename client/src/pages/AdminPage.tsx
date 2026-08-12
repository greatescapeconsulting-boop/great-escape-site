import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/PageLayout";
import SeoHead from "@/components/SeoHead";
import { toast } from "sonner";

// ─── Login Form ────────────────────────────────────────────────────────────────

function LoginForm() {
  const { login, loginPending } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={loginPending}
        className="bg-[oklch(0.33_0.08_155)] text-white hover:bg-[oklch(0.28_0.07_155)]"
      >
        {loginPending ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Lead = {
  id: number;
  name: string;
  email: string;
  company?: string | null;
  website?: string | null;
  industry?: string | null;
  referralSource?: string | null;
  promptedBy?: string | null;
  learningGoal?: string | null;
  status: string;
  notes?: string | null;
  createdAt: Date;
};

type CaseStudy = {
  id: number;
  title: string;
  summary?: string | null;
  challenge?: string | null;
  strategy?: string | null;
  actionsTaken?: string | null;
  results?: string | null;
  mediaUrl?: string | null;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
};

type Faq = {
  id: number;
  question: string;
  answer: string;
  category?: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
};

type Testimonial = {
  id: number;
  clientName: string;
  organization?: string | null;
  industry?: string | null;
  testimonial: string;
  published: boolean;
  sortOrder: number;
  createdAt: Date;
};

type Tab = "leads" | "caseStudies" | "faqs" | "testimonials";

// ─── Leads Panel ─────────────────────────────────────────────────────────────

function LeadsPanel() {
  const { data: leads, refetch } = trpc.leads.list.useQuery();
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");

  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => { refetch(); toast.success("Status updated"); },
  });
  const updateNotes = trpc.leads.updateNotes.useMutation({
    onSuccess: () => { refetch(); toast.success("Notes saved"); },
  });

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    qualified: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.03_60)] mb-3">
          {leads?.length ?? 0} leads
        </p>
        {leads?.map((lead: Lead) => (
          <button
            key={lead.id}
            onClick={() => { setSelected(lead); setNotes(lead.notes ?? ""); }}
            className={`w-full text-left rounded-lg border px-4 py-3 transition-colors ${
              selected?.id === lead.id
                ? "border-[oklch(0.33_0.08_155)] bg-[oklch(0.94_0.04_70)]"
                : "border-[oklch(0.88_0.02_70)] bg-white hover:bg-[oklch(0.97_0.01_70)]"
            }`}
          >
            <p className="font-semibold text-sm text-[oklch(0.18_0.02_50)]">{lead.name}</p>
            <p className="text-xs text-[oklch(0.55_0.03_60)]">{lead.email}</p>
            <p className="text-xs text-[oklch(0.55_0.03_60)]">{lead.company}</p>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${statusColors[lead.status] ?? ""}`}>
              {lead.status}
            </span>
          </button>
        ))}
        {(!leads || leads.length === 0) && (
          <p className="text-sm text-[oklch(0.55_0.03_60)] py-8 text-center">No leads yet.</p>
        )}
      </div>

      {selected && (
        <div className="lg:col-span-2 bg-white rounded-xl border border-[oklch(0.88_0.02_70)] p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg text-[oklch(0.18_0.02_50)]">{selected.name}</h3>
              <p className="text-sm text-[oklch(0.55_0.03_60)]">{selected.email}</p>
            </div>
            <select
              value={selected.status}
              onChange={(e) => updateStatus.mutate({ id: selected.id, status: e.target.value as any })}
              className="text-sm border border-[oklch(0.82_0.02_70)] rounded-md px-2 py-1"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {selected.company && <div><span className="text-[oklch(0.55_0.03_60)]">Company: </span>{selected.company}</div>}
            {selected.website && <div><span className="text-[oklch(0.55_0.03_60)]">Website: </span><a href={selected.website} target="_blank" rel="noopener noreferrer" className="text-[oklch(0.33_0.08_155)] underline">{selected.website}</a></div>}
            {selected.industry && <div><span className="text-[oklch(0.55_0.03_60)]">Industry: </span>{selected.industry}</div>}
            {selected.referralSource && <div><span className="text-[oklch(0.55_0.03_60)]">Source: </span>{selected.referralSource}</div>}
          </div>

          {selected.promptedBy && (
            <div>
              <p className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1">What prompted them</p>
              <p className="text-sm text-[oklch(0.40_0.03_55)] bg-warm-gradient rounded-lg p-3">{selected.promptedBy}</p>
            </div>
          )}
          {selected.learningGoal && (
            <div>
              <p className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1">Learning goal</p>
              <p className="text-sm text-[oklch(0.40_0.03_55)] bg-warm-gradient rounded-lg p-3">{selected.learningGoal}</p>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1">Notes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full text-sm border border-[oklch(0.82_0.02_70)] rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)]"
              placeholder="Add private notes…"
            />
            <Button
              size="sm"
              onClick={() => updateNotes.mutate({ id: selected.id, notes })}
              className="mt-2 bg-[oklch(0.33_0.08_155)] text-white hover:bg-[oklch(0.28_0.07_155)]"
            >
              Save Notes
            </Button>
          </div>

          <p className="text-xs text-[oklch(0.60_0.02_70)]">
            Submitted: {new Date(selected.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Case Studies Panel ───────────────────────────────────────────────────────

function CaseStudiesPanel() {
  const { data: caseStudies, refetch } = trpc.admin.caseStudies.list.useQuery();
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Partial<CaseStudy>>({});

  const createMutation = trpc.admin.caseStudies.create.useMutation({
    onSuccess: () => { refetch(); setCreating(false); setForm({}); toast.success("Case study created"); },
  });
  const updateMutation = trpc.admin.caseStudies.update.useMutation({
    onSuccess: () => { refetch(); setEditing(null); setForm({}); toast.success("Case study updated"); },
  });
  const deleteMutation = trpc.admin.caseStudies.delete.useMutation({
    onSuccess: () => { refetch(); toast.success("Case study deleted"); },
  });

  const fields: Array<{ key: keyof CaseStudy; label: string; multiline?: boolean }> = [
    { key: "title", label: "Title" },
    { key: "summary", label: "Summary", multiline: true },
    { key: "challenge", label: "Challenge", multiline: true },
    { key: "strategy", label: "Strategy", multiline: true },
    { key: "actionsTaken", label: "Actions Taken", multiline: true },
    { key: "results", label: "Results", multiline: true },
    { key: "mediaUrl", label: "Media URL" },
  ];

  const handleSave = () => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, ...form } as any);
    } else {
      createMutation.mutate(form as any);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.03_60)]">
          {caseStudies?.length ?? 0} case studies
        </p>
        <Button
          size="sm"
          onClick={() => { setCreating(true); setEditing(null); setForm({}); }}
          className="bg-[oklch(0.33_0.08_155)] text-white hover:bg-[oklch(0.28_0.07_155)]"
        >
          + Add New
        </Button>
      </div>

      {(creating || editing) && (
        <div className="bg-warm-gradient rounded-xl border border-[oklch(0.88_0.02_70)] p-6 mb-6 space-y-4">
          <h3 className="font-serif text-base text-[oklch(0.18_0.02_50)]">
            {editing ? "Edit Case Study" : "New Case Study"}
          </h3>
          {fields.map(({ key, label, multiline }) => (
            <div key={key as string}>
              <label className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1 block">
                {label}
              </label>
              {multiline ? (
                <textarea
                  rows={3}
                  value={(form[key] as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full text-sm border border-[oklch(0.82_0.02_70)] rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)]"
                />
              ) : (
                <input
                  type="text"
                  value={(form[key] as string) ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full text-sm border border-[oklch(0.82_0.02_70)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)]"
                />
              )}
            </div>
          ))}
          {editing && (
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published ?? editing.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Published
            </label>
          )}
          <div className="flex gap-3">
            <Button size="sm" onClick={handleSave} className="bg-[oklch(0.33_0.08_155)] text-white hover:bg-[oklch(0.28_0.07_155)]">
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => { setEditing(null); setCreating(false); setForm({}); }}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {caseStudies?.map((cs: CaseStudy) => (
          <div key={cs.id} className="bg-white rounded-xl border border-[oklch(0.88_0.02_70)] p-5 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-sm text-[oklch(0.18_0.02_50)]">{cs.title}</p>
              {cs.summary && <p className="text-xs text-[oklch(0.55_0.03_60)] mt-1 line-clamp-2">{cs.summary}</p>}
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-2 ${cs.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}>
                {cs.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button size="sm" variant="outline" onClick={() => { setEditing(cs); setCreating(false); setForm(cs); }}>
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => deleteMutation.mutate({ id: cs.id })}>
                Delete
              </Button>
            </div>
          </div>
        ))}
        {(!caseStudies || caseStudies.length === 0) && !creating && (
          <p className="text-sm text-[oklch(0.55_0.03_60)] py-8 text-center">No case studies yet.</p>
        )}
      </div>
    </div>
  );
}

// ─── FAQs Panel ───────────────────────────────────────────────────────────────

function FaqsPanel() {
  const { data: faqs, refetch } = trpc.admin.faqs.list.useQuery();
  const [editing, setEditing] = useState<Faq | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Partial<Faq>>({});

  const createMutation = trpc.admin.faqs.create.useMutation({
    onSuccess: () => { refetch(); setCreating(false); setForm({}); toast.success("FAQ created"); },
  });
  const updateMutation = trpc.admin.faqs.update.useMutation({
    onSuccess: () => { refetch(); setEditing(null); setForm({}); toast.success("FAQ updated"); },
  });
  const deleteMutation = trpc.admin.faqs.delete.useMutation({
    onSuccess: () => { refetch(); toast.success("FAQ deleted"); },
  });

  const handleSave = () => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, ...form } as any);
    } else {
      createMutation.mutate(form as any);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.03_60)]">
          {faqs?.length ?? 0} FAQs
        </p>
        <Button
          size="sm"
          onClick={() => { setCreating(true); setEditing(null); setForm({}); }}
          className="bg-[oklch(0.33_0.08_155)] text-white hover:bg-[oklch(0.28_0.07_155)]"
        >
          + Add New
        </Button>
      </div>

      {(creating || editing) && (
        <div className="bg-warm-gradient rounded-xl border border-[oklch(0.88_0.02_70)] p-6 mb-6 space-y-4">
          <h3 className="font-serif text-base text-[oklch(0.18_0.02_50)]">
            {editing ? "Edit FAQ" : "New FAQ"}
          </h3>
          <div>
            <label className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1 block">Question</label>
            <input
              type="text"
              value={form.question ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              className="w-full text-sm border border-[oklch(0.82_0.02_70)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1 block">Answer</label>
            <textarea
              rows={4}
              value={form.answer ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
              className="w-full text-sm border border-[oklch(0.82_0.02_70)] rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1 block">Category (optional)</label>
            <input
              type="text"
              value={form.category ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full text-sm border border-[oklch(0.82_0.02_70)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)]"
            />
          </div>
          {editing && (
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published ?? editing.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Published
            </label>
          )}
          <div className="flex gap-3">
            <Button size="sm" onClick={handleSave} className="bg-[oklch(0.33_0.08_155)] text-white hover:bg-[oklch(0.28_0.07_155)]">
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => { setEditing(null); setCreating(false); setForm({}); }}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {faqs?.map((faq: Faq) => (
          <div key={faq.id} className="bg-white rounded-xl border border-[oklch(0.88_0.02_70)] p-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="font-semibold text-sm text-[oklch(0.18_0.02_50)]">{faq.question}</p>
              <p className="text-xs text-[oklch(0.55_0.03_60)] mt-1 line-clamp-2">{faq.answer}</p>
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-2 ${faq.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}>
                {faq.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button size="sm" variant="outline" onClick={() => { setEditing(faq); setCreating(false); setForm(faq); }}>
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => deleteMutation.mutate({ id: faq.id })}>
                Delete
              </Button>
            </div>
          </div>
        ))}
        {(!faqs || faqs.length === 0) && !creating && (
          <p className="text-sm text-[oklch(0.55_0.03_60)] py-8 text-center">No FAQs yet.</p>
        )}
      </div>
    </div>
  );
}

// ─── Testimonials Panel ───────────────────────────────────────────────────────

function TestimonialsPanel() {
  const { data: testimonials, refetch } = trpc.admin.testimonials.list.useQuery();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Partial<Testimonial>>({});

  const createMutation = trpc.admin.testimonials.create.useMutation({
    onSuccess: () => { refetch(); setCreating(false); setForm({}); toast.success("Testimonial created"); },
  });
  const updateMutation = trpc.admin.testimonials.update.useMutation({
    onSuccess: () => { refetch(); setEditing(null); setForm({}); toast.success("Testimonial updated"); },
  });
  const deleteMutation = trpc.admin.testimonials.delete.useMutation({
    onSuccess: () => { refetch(); toast.success("Testimonial deleted"); },
  });

  const handleSave = () => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, ...form } as any);
    } else {
      createMutation.mutate(form as any);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.03_60)]">
          {testimonials?.length ?? 0} testimonials
        </p>
        <Button
          size="sm"
          onClick={() => { setCreating(true); setEditing(null); setForm({}); }}
          className="bg-[oklch(0.33_0.08_155)] text-white hover:bg-[oklch(0.28_0.07_155)]"
        >
          + Add New
        </Button>
      </div>

      {(creating || editing) && (
        <div className="bg-warm-gradient rounded-xl border border-[oklch(0.88_0.02_70)] p-6 mb-6 space-y-4">
          <h3 className="font-serif text-base text-[oklch(0.18_0.02_50)]">
            {editing ? "Edit Testimonial" : "New Testimonial"}
          </h3>
          <div>
            <label className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1 block">Client Name</label>
            <input
              type="text"
              value={form.clientName ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
              className="w-full text-sm border border-[oklch(0.82_0.02_70)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1 block">Organization (optional)</label>
            <input
              type="text"
              value={form.organization ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
              className="w-full text-sm border border-[oklch(0.82_0.02_70)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1 block">Industry (optional)</label>
            <input
              type="text"
              value={form.industry ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
              className="w-full text-sm border border-[oklch(0.82_0.02_70)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[oklch(0.55_0.03_60)] uppercase tracking-wide mb-1 block">Testimonial</label>
            <textarea
              rows={4}
              value={form.testimonial ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, testimonial: e.target.value }))}
              className="w-full text-sm border border-[oklch(0.82_0.02_70)] rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[oklch(0.33_0.08_155)]"
            />
          </div>
          {editing && (
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published ?? editing.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Published
            </label>
          )}
          <div className="flex gap-3">
            <Button size="sm" onClick={handleSave} className="bg-[oklch(0.33_0.08_155)] text-white hover:bg-[oklch(0.28_0.07_155)]">
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => { setEditing(null); setCreating(false); setForm({}); }}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {testimonials?.map((t: Testimonial) => (
          <div key={t.id} className="bg-white rounded-xl border border-[oklch(0.88_0.02_70)] p-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="font-semibold text-sm text-[oklch(0.18_0.02_50)]">{t.clientName}</p>
              {t.organization && <p className="text-xs text-[oklch(0.55_0.03_60)]">{t.organization}</p>}
              <p className="text-xs text-[oklch(0.55_0.03_60)] mt-1 line-clamp-2 italic">"{t.testimonial}"</p>
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-2 ${t.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}>
                {t.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button size="sm" variant="outline" onClick={() => { setEditing(t); setCreating(false); setForm(t); }}>
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => deleteMutation.mutate({ id: t.id })}>
                Delete
              </Button>
            </div>
          </div>
        ))}
        {(!testimonials || testimonials.length === 0) && !creating && (
          <p className="text-sm text-[oklch(0.55_0.03_60)] py-8 text-center">No testimonials yet.</p>
        )}
      </div>
    </div>
  );
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("leads");

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "leads", label: "Leads" },
    { id: "caseStudies", label: "Case Studies" },
    { id: "faqs", label: "FAQs" },
    { id: "testimonials", label: "Testimonials" },
  ];

  if (loading) {
    return (
      <PageLayout>
        <div className="section-padding bg-white flex items-center justify-center">
          <p className="text-[oklch(0.55_0.03_60)]">Loading…</p>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout>
        <SeoHead title="Admin | Great Escape Consulting" description="" canonicalPath="/admin" />
        <div className="section-padding bg-white flex flex-col items-center justify-center text-center">
          <h1 className="font-serif text-2xl text-[oklch(0.18_0.02_50)] mb-4">Admin Access Required</h1>
          <p className="text-[oklch(0.45_0.03_60)] mb-6">Please sign in to access the admin panel.</p>
          <LoginForm />
        </div>
      </PageLayout>
    );
  }

  if (user.role !== "admin") {
    return (
      <PageLayout>
        <SeoHead title="Admin | Great Escape Consulting" description="" canonicalPath="/admin" />
        <div className="section-padding bg-white flex flex-col items-center justify-center text-center">
          <h1 className="font-serif text-2xl text-[oklch(0.18_0.02_50)] mb-4">Access Denied</h1>
          <p className="text-[oklch(0.45_0.03_60)]">You don't have permission to access this page.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SeoHead title="Admin | Great Escape Consulting" description="" canonicalPath="/admin" />

      <section className="bg-warm-gradient py-10 border-b border-[oklch(0.88_0.02_70)]">
        <div className="container">
          <h1 className="font-serif text-3xl text-[oklch(0.18_0.02_50)] mb-1">Admin Panel</h1>
          <p className="text-sm text-[oklch(0.55_0.03_60)]">Welcome, {user.name ?? user.email}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          {/* Tabs */}
          <div className="flex gap-1 border-b border-[oklch(0.88_0.02_70)] mb-8">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                  tab === t.id
                    ? "border-[oklch(0.33_0.08_155)] text-[oklch(0.33_0.08_155)]"
                    : "border-transparent text-[oklch(0.55_0.03_60)] hover:text-[oklch(0.25_0.03_50)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "leads" && <LeadsPanel />}
          {tab === "caseStudies" && <CaseStudiesPanel />}
          {tab === "faqs" && <FaqsPanel />}
          {tab === "testimonials" && <TestimonialsPanel />}
        </div>
      </section>
    </PageLayout>
  );
}
