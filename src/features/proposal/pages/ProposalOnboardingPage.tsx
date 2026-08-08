import { useState, useEffect } from 'react';
import { CheckCircle2, ArrowLeft, ArrowRight, Upload, X } from 'lucide-react';
import { cx, Logo, Card, PrimaryButton, GhostButton, Field } from '../components/ui/ProposalPrimitives';

const ONBOARDING_STEPS = ["Basic Info", "Education", "Photos"];

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
  const last = step === ONBOARDING_STEPS.length - 1;

  const [images, setImages] = useState<(string | null)[]>([null, null, null, null, null, null]);

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...images];
        newImages[index] = event.target?.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <div className="w-full flex flex-col py-6">
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between mb-8">
        <button onClick={onBack} className="hover:opacity-80 transition-opacity"><Logo /></button>
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
            {step === 1 && "Tell us about your studies and career."}
            {step === 2 && "Add a few clear photos — you choose what stays blurred."}
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
                <Field label="University" placeholder="e.g. University of Moratuwa" required />
                <Field label="Faculty" placeholder="e.g. Engineering - Civil" required />
                <Field label="Status" placeholder="Undergraduate / Graduate" isSelect options={["Undergraduate", "Graduate"]} required />
                <Field label="Profession" placeholder="e.g. Civil Engineer" required />
              </div>
            )}
            
            {step === 2 && (
              <div className="animate-fade-up space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {images.map((img, i) => (
                    img ? (
                      <div key={i} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm group">
                        <img src={img} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-rose-500 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X size={14} strokeWidth={3} />
                        </button>
                      </div>
                    ) : (
                      <label
                        key={i}
                        className="aspect-[4/5] rounded-2xl grid place-items-center border-2 border-dashed transition-colors cursor-pointer bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                      >
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(i, e)} />
                        <Upload size={24} strokeWidth={2.5} />
                      </label>
                    )
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
