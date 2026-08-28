import { useState, useEffect } from 'react';
import { CheckCircle2, ArrowLeft, ArrowRight, Upload, X, Briefcase, GraduationCap } from 'lucide-react';
import { cx, Logo, Card, PrimaryButton, GhostButton } from '../components/ui/ProposalPrimitives';
import { proposalApi } from '../api/proposalApi';

const ONBOARDING_STEPS = ["Basic Info", "Education & Career", "Photos"];

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
  const [loading, setLoading] = useState(false);
  const last = step === ONBOARDING_STEPS.length - 1;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    civil_status: 'Never Married',
    district: 'Colombo',
    hometown_district: 'Colombo',
    religion: 'Buddhist',
    ethnicity: 'Sinhalese',

    // Education & Career
    education_category: 'University',
    university: '',
    workplace_or_institute: '',
    faculty: '',
    status: 'Undergraduate',
    education_goal: 'Bachelor Degree',
    profession: '',

    // Mindset & Sri Lankan Prompts
    past_affairs_openness: 'Open to partners with past affairs',
    social_drinking_level: 'Non-drinker',
    prompt_about_me: '',
    prompt_ideal_partner: '',
    prompt_ideal_date: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [images, setImages] = useState<(string | null)[]>([null, null, null]);

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
        <form onSubmit={async (e) => {
          e.preventDefault();
          if (last) {
            setLoading(true);
            try {
              const payload = {
                ...formData,
                age: parseInt(formData.age) || 18,
                lookingFor: formData.gender === 'Male' ? 'Female' : 'Male', // Default assumption
                images: images.filter(Boolean),
                blur_photo: true // Default
              };
              await proposalApi.submitProfile(payload);
              onComplete();
            } catch (error) {
              console.error(error);
              alert("Failed to submit profile. Please try again.");
            } finally {
              setLoading(false);
            }
          } else {
            setStep((s) => s + 1);
          }
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
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="e.g. Kasun Bandara" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Age</label>
                    <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="e.g. 27" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Civil Status</label>
                    <select name="civil_status" value={formData.civil_status} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                      <option value="Never Married">Never Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Current Living District</label>
                    <select name="district" value={formData.district} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                      {["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Moneragala", "Ratnapura", "Kegalle"].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Hometown District (ගම)</label>
                    <select name="hometown_district" value={formData.hometown_district} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                      {["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Moneragala", "Ratnapura", "Kegalle"].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Past Affairs Openness</label>
                    <select name="past_affairs_openness" value={formData.past_affairs_openness} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                      <option value="Open to partners with past affairs">Open to partners with past affairs</option>
                      <option value="Never had affairs before">Never had affairs before</option>
                      <option value="First relationship preferred">First relationship preferred</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Drinking Lifestyle</label>
                    <select name="social_drinking_level" value={formData.social_drinking_level} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                      <option value="Non-drinker 🚭">Non-drinker 🚭</option>
                      <option value="Social/Occasional Drinker 🍷">Social/Occasional Drinker 🍷</option>
                      <option value="Regular Drinker">Regular Drinker</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Religion</label>
                    <select name="religion" value={formData.religion} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                      {["Buddhist", "Hindu", "Muslim", "Catholic", "Christian", "Other"].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6 animate-fade-up">

                  {/* Category Selection */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Who are you?</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => setFormData({ ...formData, education_category: 'University' })} className={cx("flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all", formData.education_category === 'University' ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400" : "border-slate-200 dark:border-slate-800 hover:border-rose-300 text-slate-500")}>
                        <GraduationCap size={28} className="mb-2" />
                        <span className="font-bold text-sm">University Student / Alumni</span>
                      </button>
                      <button type="button" onClick={() => setFormData({ ...formData, education_category: 'Professional Qualification' })} className={cx("flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all", formData.education_category !== 'University' ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400" : "border-slate-200 dark:border-slate-800 hover:border-rose-300 text-slate-500")}>
                        <Briefcase size={28} className="mb-2" />
                        <span className="font-bold text-sm">Working Professional / Abroad</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {formData.education_category === 'University' ? (
                      <>
                        <div className="sm:col-span-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">University</label>
                          <input required name="university" value={formData.university} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="e.g. University of Moratuwa" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Faculty</label>
                          <input name="faculty" value={formData.faculty} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="e.g. Engineering" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Status</label>
                          <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Graduate">Graduate</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Institute / Workplace / Location</label>
                        <input required name="workplace_or_institute" value={formData.workplace_or_institute} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="e.g. CIMA / Tech Company / Dubai" />
                      </div>
                    )}

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Profession</label>
                      <input required name="profession" value={formData.profession} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="e.g. Software Engineer" />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Academic Level / Goal</label>
                      <select name="education_goal" value={formData.education_goal} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Bachelor Degree">Bachelor Degree</option>
                        <option value="MSc Completed">MSc Completed</option>
                        <option value="Pursuing PhD / Doctorate">Pursuing PhD / Doctorate</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <div>
                        <label className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-2 block">🌸 මං ගැන වචන කිහිපයකින්... (About Me)</label>
                        <textarea required name="prompt_about_me" value={formData.prompt_about_me} onChange={handleChange} rows={2} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="e.g. මං සරල, අවංකව ආදරේ කරන කෙනෙක්. Travel කරන්නයි Movies බලන්නයි ආසයි..." />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-2 block">🥰 මං හොයන්නේ මෙහෙම කෙනෙක්... (What I Look For)</label>
                        <textarea required name="prompt_ideal_partner" value={formData.prompt_ideal_partner} onChange={handleChange} rows={2} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="e.g. තේරුම් ගන්න පුළුවන්, ගතිගුණ හොඳ, එකිනෙකාට ගරු කරන කෙනෙක්..." />
                      </div>
                    </div>
                  </div>
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
                disabled={loading}
              >
                {loading ? "Submitting..." : (last ? "Complete Profile" : "Continue")}
              </PrimaryButton>
            </div>
          </Card>
        </form>
      </main>
    </div>
  );
}
