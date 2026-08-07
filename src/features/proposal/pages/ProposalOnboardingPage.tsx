import { useState, useEffect } from 'react';
import { CheckCircle2, ArrowLeft, ArrowRight, Upload } from 'lucide-react';
import { cx, Logo, Card, PrimaryButton, GhostButton, Field } from '../components/ui/ProposalPrimitives';

const ONBOARDING_STEPS = ["Basic Info", "Physical & Lifestyle", "Education & Family", "About You", "Preferences", "Photos"];

export default function ProposalOnboardingPage({
  dark,
  onComplete,
  onBack
}: {
  dark: boolean;
  onComplete: () => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState(0);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const last = step === ONBOARDING_STEPS.length - 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <div className="w-full flex flex-col py-6">
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between mb-8">
        <button onClick={onBack} className="hover:opacity-80 transition-opacity"><Logo dark={dark} /></button>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          Step {step + 1} of {ONBOARDING_STEPS.length}
        </span>
      </header>

      {/* Stepper */}
      <div className="max-w-2xl w-full mx-auto mb-10">
        <div className="flex items-start gap-2">
          {ONBOARDING_STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col gap-2 min-w-0">
              <div
                className={cx(
                  "h-2 w-full rounded-full transition-all duration-500",
                  i < step
                    ? "bg-rose-500"
                    : i === step
                    ? "bg-gradient-to-r from-rose-500 to-fuchsia-500"
                    : "bg-slate-200 dark:bg-slate-800"
                )}
              />
              <span className={cx(
                "text-[10px] font-bold uppercase tracking-wider transition-colors truncate",
                i <= step ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-600"
              )}>
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-2xl w-full mx-auto flex-1">
        <form onSubmit={(e) => {
          e.preventDefault();
          if (last) onComplete();
          else setStep((s) => s + 1);
        }}>
          <Card className="p-8 sm:p-10 shadow-xl shadow-rose-500/5">
            <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white tracking-tight">
            {ONBOARDING_STEPS[step]}
          </h2>
          <p className="text-sm font-medium mb-8 text-slate-500 dark:text-slate-400">
            {step === 0 && "Let's start with the basics."}
            {step === 1 && "Physical traits and lifestyle habits."}
            {step === 2 && "Tell us about your studies, career, and family background."}
            {step === 3 && "Give future matches a sense of who you are."}
            {step === 4 && "Who are you hoping to meet?"}
            {step === 5 && "Add a few clear photos — you choose what stays blurred."}
          </p>

          <div className="min-h-[300px]">
            {step === 0 && (
              <div className="grid sm:grid-cols-2 gap-5 animate-fade-up">
                <Field label="Full Name" placeholder="e.g. Kasun Bandara" required />
                <Field label="Age" placeholder="e.g. 27" required />
                <Field label="Gender" placeholder="Select" isSelect options={["Male", "Female"]} required />
                <Field label="Civil Status" placeholder="Select" isSelect options={["Never Married", "Divorced", "Widowed"]} required />
                <Field label="District" placeholder="Select" isSelect options={["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Moneragala", "Ratnapura", "Kegalle"]} required />
                <Field label="Religion" placeholder="Select" isSelect options={["Buddhist", "Hindu", "Muslim", "Catholic", "Christian", "Other"]} required />
                <Field label="Ethnicity" placeholder="Select" isSelect options={["Sinhalese", "Tamil", "Muslim", "Burgher", "Malay", "Other"]} required />
              </div>
            )}
            {step === 1 && (
              <div className="grid sm:grid-cols-2 gap-5 animate-fade-up">
                <Field label="Height" placeholder="e.g. 5' 10&quot;" required />
                <Field label="Weight (kg)" placeholder="e.g. 70" required />
                <Field label="Complexion / Skin Tone" placeholder="Fair / Medium / Dark" isSelect required />
                <Field label="Diet" placeholder="Vegetarian / Non-Veg" isSelect required />
                <Field label="Smoking" placeholder="No / Yes / Occasionally" isSelect required />
                <Field label="Drinking" placeholder="No / Yes / Occasionally" isSelect required />
              </div>
            )}
            {step === 2 && (
              <div className="grid sm:grid-cols-2 gap-5 animate-fade-up">
                <Field label="University" placeholder="e.g. University of Moratuwa" required />
                <Field label="Faculty" placeholder="e.g. Engineering - Civil" required />
                <Field label="Status" placeholder="Undergraduate / Alumni" isSelect required />
                <Field label="Profession" placeholder="e.g. Civil Engineer" required />
                <Field label="Father's Profession" placeholder="e.g. Teacher" required />
                <Field label="Mother's Profession" placeholder="e.g. Housewife" required />
                <Field label="Number of Siblings" placeholder="e.g. 2 (1 Brother, 1 Sister)" required />
              </div>
            )}
            {step === 3 && (
              <div className="animate-fade-up space-y-6">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider mb-2 block text-slate-600 dark:text-slate-400">
                    Your Bio
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about yourself — your interests, what a weekend looks like, and what you're looking for..."
                    className="w-full text-sm rounded-xl px-4 py-3 outline-none resize-none transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider mb-2 block text-slate-600 dark:text-slate-400">
                    Hobbies
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {["Photography", "Hiking", "Reading", "Cooking", "Traveling", "Music", "Cricket", "Yoga"].map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setSelectedHobbies(prev => prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h])}
                        className={cx(
                          "text-xs font-bold px-4 py-2 rounded-lg border-2 transition-colors",
                          selectedHobbies.includes(h)
                            ? "border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-500/10"
                            : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-rose-500 hover:text-rose-500 dark:hover:border-rose-400 dark:hover:text-rose-400"
                        )}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="grid sm:grid-cols-2 gap-5 animate-fade-up">
                <Field label="Looking For" placeholder="Male / Female" isSelect options={["Male", "Female"]} required />
                <Field label="Age Range" placeholder="e.g. 24 – 30" required />
                <Field label="Minimum Height" placeholder="e.g. Above 5' 2&quot;" isSelect options={["Doesn't Matter", "Above 5' 0\"", "Above 5' 2\"", "Above 5' 4\"", "Above 5' 6\"", "Above 5' 8\"", "Above 5' 10\"", "Above 6' 0\""]} required />
                <Field label="Preferred District" placeholder="Any" isSelect options={["Any", "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Moneragala", "Ratnapura", "Kegalle"]} required />
                <Field label="Preferred Religion" placeholder="Any" isSelect options={["Any", "Buddhist", "Hindu", "Muslim", "Catholic", "Christian", "Other"]} required />
                <Field label="Preferred Ethnicity" placeholder="Any" isSelect options={["Any", "Sinhalese", "Tamil", "Muslim", "Burgher", "Malay", "Other"]} required />
                <Field label="Accepts Smoking/Drinking?" placeholder="Yes / No / Doesn't Matter" isSelect options={["Doesn't Matter", "No Smoking/Drinking", "Occasional is fine", "Yes"]} required />
                <Field label="Diet Requirement" placeholder="Must be Vegetarian / Any" isSelect options={["Any", "Must be Vegetarian", "Non-Vegetarian", "Vegan"]} required />
              </div>
            )}
            {step === 5 && (
              <div className="animate-fade-up space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <label
                      key={i}
                      className="aspect-[4/5] rounded-2xl grid place-items-center border-2 border-dashed transition-colors cursor-pointer bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    >
                      <input type="file" accept="image/*" className="hidden" />
                      <Upload size={24} strokeWidth={2.5} />
                    </label>
                  ))}
                </div>
                
                {/* Photo Blurring Toggle UI */}
                <div className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Blur my photos by default</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-sm">
                      Your photos will remain blurred to others until you explicitly accept their proposal.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
            <GhostButton
              type="button"
              dark={dark}
              icon={ArrowLeft}
              onClick={() => (step === 0 ? onBack() : setStep((s) => s - 1))}
            >
              {step === 0 ? "Cancel" : "Back"}
            </GhostButton>
            <PrimaryButton
              type="submit"
              icon={last ? CheckCircle2 : ArrowRight}
            >
              {last ? "Complete Profile" : "Continue"}
            </PrimaryButton>
          </div>
        </Card>
      </form>
    </main>
    </div>
  );
}
