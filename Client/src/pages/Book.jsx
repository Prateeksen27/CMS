import React, { useMemo, useState, useEffect } from "react";
import { User, CalendarDays, UtensilsCrossed, FileCheck2, Check } from "lucide-react";
import { jsPDF } from "jspdf";

const STEPS = [
  { key: "personal", title: "Personal Details", subtitle: "Your contact information", icon: User },
  { key: "event", title: "Event Details", subtitle: "Event information", icon: CalendarDays },
  { key: "menu", title: "Menu Selection", subtitle: "Choose your menu", icon: UtensilsCrossed },
  { key: "review", title: "Review", subtitle: "Review and confirm", icon: FileCheck2 },
];

const initialData = {
  personal: { fullName: "", email: "", phone: "" },
  event: { type: "Birthday Party", guests: 50, date: "", time: "", venue: "", notes: "" },
  menu: {
    items: { veg: true, nonveg: false, beverages: true, desserts: true },
    // NEW: ensure this exists so checkbox writes don't crash
    selectedItems: {
      starters: [],
      maincourse: [],
      beverages: [],
      desserts: [],
    },
    specialRequests: "",
  },
  termsAccepted: false,
};

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(() => {
    const draft = localStorage.getItem("catering_booking_draft");
    return draft ? JSON.parse(draft) : initialData;
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem("catering_booking_draft", JSON.stringify(data));
  }, [data]);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  // Robust nested updater: creates missing objects along the path
  function update(path, value) {
    setData((prev) => {
      const next = structuredClone(prev);
      let ptr = next;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (ptr[key] == null || typeof ptr[key] !== "object") {
          ptr[key] = {};
        }
        ptr = ptr[key];
      }
      ptr[path[path.length - 1]] = value;
      return next;
    });
  }

  function validate(currentStep = step) {
    const e = {};
    if (currentStep === 0) {
      if (!data.personal.fullName.trim()) e.fullName = "Full name is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email)) e.email = "Valid email required";
      if (!/^\+?[0-9\-()\s]{7,}$/.test(data.personal.phone)) e.phone = "Valid phone required";
    }
    if (currentStep === 1) {
      if (!data.event.type) e.type = "Select event type";
      if (!data.event.date) e.date = "Event date is required";
      if (!data.event.time) e.time = "Event time is required";
      if (!data.event.guests || Number(data.event.guests) <= 0) e.guests = "Guests must be > 0";
      if (!data.event.venue.trim()) e.venue = "Venue is required";
    }
    if (currentStep === 2) {
      const anyCategoryToggle = Object.values(data.menu.items || {}).some(Boolean);
      const anyDishPicked = Object.values(data.menu.selectedItems || {}).some(
        (arr) => Array.isArray(arr) && arr.length > 0
      );
      if (!anyCategoryToggle && !anyDishPicked) {
        e.menu = "Select at least one menu item.";
      }
    }
    if (currentStep === 3) {
      if (!data.termsAccepted) e.terms = "Please accept terms to continue";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onNext() {
    if (!validate(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function onBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function fakeSubmit(payload) {
    await new Promise((r) => setTimeout(r, 1200));
  }

  async function onSubmit() {
    if (!validate(3)) return;
    setSubmitting(true);
    try {
      const payload = { ...data, createdAt: new Date().toISOString() };
      await fakeSubmit(payload);
      localStorage.removeItem("catering_booking_draft");
      setSubmitted(true);
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-start md:items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-semibold">Booking Confirmed</h1>
          <p className="text-slate-600 mt-2">We've received your request. Our team will contact you shortly to finalize details.</p>
          <button
            className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setData(initialData);
            }}
          >
            Make another booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/60">
      <header className="pt-10 pb-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Event Booking</h1>
        <p className="text-slate-600 mt-2">Complete your booking in a few simple steps</p>
      </header>

      <div className="mx-auto max-w-5xl px-4 md:px-6">
        {/* Stepper */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
          <Stepper step={step} />
          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-slate-600"><span>Progress</span><span>{Math.round(progress)}% Complete</span></div>
            <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-4 md:p-8">
          {step === 0 && (
            <PersonalForm data={data.personal} errors={errors} onChange={(k, v) => update(["personal", k], v)} />
          )}
          {step === 1 && (
            <EventForm data={data.event} errors={errors} onChange={(k, v) => update(["event", k], v)} />
          )}
          {step === 2 && (
            <MenuForm data={data.menu} errors={errors} onChange={(path, v) => update(["menu", ...path], v)} />
          )}
          {step === 3 && (
            <Review data={data} errors={errors} onToggleTerms={(v) => update(["termsAccepted"], v)} />
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-between">
            <div className="flex gap-3">
              <button
                onClick={onBack}
                disabled={step === 0}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 disabled:opacity-40"
              >
                Back
              </button>
              <button
                onClick={() => setData(initialData)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700"
              >
                Reset
              </button>
            </div>

            {step < 3 ? (
              <button onClick={onNext} className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                Continue
              </button>
            ) : (
              <button
                onClick={onSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Confirm Booking"}
              </button>
            )}
          </div>
        </div>

        <footer className="py-10 text-center text-xs text-slate-500">© {new Date().getFullYear()} Your Catering Co.</footer>
      </div>
    </div>
  );
}

function Stepper({ step }) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
      {STEPS.map((s, idx) => {
        const Icon = s.icon;
        const state = idx < step ? "done" : idx === step ? "current" : "todo";
        return (
          <div key={s.key} className="flex items-center w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div
                className={
                  "h-11 w-11 shrink-0 rounded-full grid place-items-center border " +
                  (state === "done"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : state === "current"
                    ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                    : "bg-slate-50 text-slate-500 border-slate-200")
                }
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium leading-tight">{s.title}</div>
                <div className="text-xs text-slate-500">{s.subtitle}</div>
              </div>
            </div>
            {idx < STEPS.length - 1 && (
              <div className="hidden md:block h-px w-28 mx-4 bg-slate-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, error, required, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-rose-600">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="text-rose-600 text-sm mt-1">{error}</p>}
    </label>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
      {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
    </div>
  );
}

function PersonalForm({ data, errors, onChange }) {
  return (
    <div>
      <SectionTitle title="Personal Information" subtitle="Tell us how we can reach you" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Full Name" error={errors.fullName} required>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., Gouranga Sahoo"
          />
        </Field>
        <Field label="Email" error={errors.email} required>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Phone" error={errors.phone} required>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="+91 98765 43210"
          />
        </Field>
      </div>
    </div>
  );
}

function EventForm({ data, errors, onChange }) {
  return (
    <div>
      <SectionTitle title="Event Information" subtitle="Tell us about your event so we can prepare accordingly" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Event Type" error={errors.type} required>
          <select
            value={data.type}
            onChange={(e) => onChange("type", e.target.value)}
            className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            {[
              "Birthday Party",
              "Wedding",
              "Corporate Event",
              "Engagement",
              "Baby Shower",
              "Other",
            ].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Number of Guests" error={errors.guests} required>
          <input
            type="number"
            min={1}
            value={data.guests}
            onChange={(e) => onChange("guests", Number(e.target.value))}
            className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </Field>
        <Field label="Event Date" error={errors.date} required>
          <input
            type="date"
            value={data.date}
            onChange={(e) => onChange("date", e.target.value)}
            className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </Field>
        <Field label="Event Time" error={errors.time} required>
          <input
            type="time"
            value={data.time}
            onChange={(e) => onChange("time", e.target.value)}
            className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </Field>
        <Field label="Venue Address" error={errors.venue} required>
          <input
            type="text"
            value={data.venue}
            onChange={(e) => onChange("venue", e.target.value)}
            className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Hall/Address, City"
          />
        </Field>
        <Field label="Notes (Optional)">
          <textarea
            rows={3}
            value={data.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Any special instructions"
          />
        </Field>
      </div>
    </div>
  );
}

function MenuForm({ data, errors, onChange }) {
  const menuCategories = {
    starters: ["Aloo Tikki", "Bruschetta", "Chilli Paneer", "Spring Rolls"],
    maincourse: ["Paneer Butter Masala", "Chicken Curry", "Veg Biryani", "Dal Makhani"],
    beverages: ["Mango Lassi", "Cold Coffee", "Lemon Iced Tea", "Masala Chai"],
    desserts: ["Gulab Jamun", "Ice Cream", "Brownie", "Fruit Salad"],
  };

  const [activeCategory, setActiveCategory] = useState("starters");

  return (
    <div>
      <h2 className="text-2xl font-bold">Menu Selection</h2>
      <p className="text-slate-600">Choose your menu categories and package</p>

      {/* Tab Buttons */}
      <div className="mt-6 flex gap-2">
        {Object.keys(menuCategories).map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-lg font-medium border transition-all ${
                isActive
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Food Items */}
      <div className="mt-4 grid gap-2 border rounded-xl p-4 bg-white">
        {menuCategories[activeCategory]
          .slice()
          .sort()
          .map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={data.selectedItems?.[activeCategory]?.includes(item) || false}
                onChange={(e) => {
                  const picked = new Set(data.selectedItems?.[activeCategory] || []);
                  if (e.target.checked) picked.add(item);
                  else picked.delete(item);
                  onChange(["selectedItems", activeCategory], Array.from(picked));
                }}
                className="h-5 w-5 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-slate-700">{item}</span>
            </label>
          ))}
      </div>

      {errors.menu && <p className="text-rose-600 text-sm mt-3">{errors.menu}</p>}

      {/* Special Requests */}
      <div className="mt-6">
        <label className="block font-medium text-slate-700 mb-1">Special Requests (Optional)</label>
        <textarea
          rows={3}
          value={data.specialRequests}
          onChange={(e) => onChange(["specialRequests"], e.target.value)}
          className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="e.g., Jain food, no onion & garlic, theme colors, etc."
        />
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b last:border-0 border-slate-100">
      <div className="sm:w-56 text-slate-500 text-sm">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}


function Review({ data, errors, onToggleTerms }) {
  const picked =
    data.menu?.selectedItems &&
    Object.entries(data.menu.selectedItems)
      .flatMap(([cat, arr]) =>
        arr && arr.length ? arr.map((x) => `${x} (${cat})`) : []
      )
      .join(", ");

  const handleDownload = () => {
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Review & Confirm", 105, 15, { align: "center" });

    let y = 30;

    const addSection = (title) => {
      doc.setFillColor(230, 230, 230);
      doc.rect(10, y - 6, 190, 8, "F");
      doc.setFontSize(14);
      doc.setTextColor(0, 102, 204);
      doc.setFont("helvetica", "bold");
      doc.text(title, 12, y);
      y += 10;
    };

    const addField = (label, value) => {
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "normal");
      doc.text(`${label}:`, 12, y);

      doc.setFont("helvetica", "bold");
      let textLines = doc.splitTextToSize(value || "—", 140);
      doc.text(textLines, 50, y);
      y += textLines.length * 6;
    };

    // Sections
    addSection("Personal Details");
    addField("Full Name", data.personal.fullName);
    addField("Email", data.personal.email);
    addField("Phone", data.personal.phone);

    y += 2;
    addSection("Event Details");
    addField("Type", data.event.type);
    addField("Guests", String(data.event.guests));
    addField(
      "Date & Time",
      `${data.event.date || "—"} ${data.event.time || ""}`
    );
    addField("Venue", data.event.venue);
    addField("Notes", data.event.notes);

    y += 2;
    addSection("Menu Details")

    if (picked) addField("Selected Dishes", picked);
    if (data.menu.specialRequests)
      addField("Special Requests", data.menu.specialRequests);

    doc.save("review_form.pdf");
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Review & Confirm"
        subtitle="Check all details before submitting"
      />

      {/* Personal Details */}
      <div>
        <h3 className="text-lg font-semibold">Personal Details</h3>
        <p><strong>Full Name:</strong> {data.personal.fullName}</p>
        <p><strong>Email:</strong> {data.personal.email}</p>
        <p><strong>Phone:</strong> {data.personal.phone}</p>
      </div>

      {/* Event Details */}
      <div>
        <h3 className="text-lg font-semibold">Event Details</h3>
        <p><strong>Type:</strong> {data.event.type}</p>
        <p><strong>Guests:</strong> {data.event.guests}</p>
        <p>
          <strong>Date & Time:</strong>{" "}
          {data.event.date} {data.event.time}
        </p>
        <p><strong>Venue:</strong> {data.event.venue}</p>
        <p><strong>Notes:</strong> {data.event.notes}</p>
      </div>

      {/* Menu Details */}
      <div>
        <h3 className="text-lg font-semibold">Menu Details</h3>
        {picked && <p><strong>Selected Dishes:</strong> {picked}</p>}
        {data.menu.specialRequests && (
          <p><strong>Special Requests:</strong> {data.menu.specialRequests}</p>
        )}
      </div>

      {/* Terms Checkbox */}
      <label className="flex items-start gap-3 mt-6">
        <input
          type="checkbox"
          checked={data.termsAccepted}
          onChange={(e) => onToggleTerms(e.target.checked)}
          className="mt-1 h-5 w-5 rounded border-slate-300"
        />
        <span className="text-sm text-slate-700">
          I confirm the above details are correct and agree to the terms of
          service & privacy policy.
        </span>
      </label>
      {errors.terms && (
        <p className="text-rose-600 text-sm mt-2">{errors.terms}</p>
      )}

      {/* Download Button at Bottom */}
      <div className="pt-4 border-t mt-6">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
