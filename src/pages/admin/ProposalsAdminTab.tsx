import { useState } from 'react';
import { LuCheck, LuX, LuGraduationCap, LuBriefcase } from 'react-icons/lu';
import toast from 'react-hot-toast';

const mockPendingProposals = [
  {
    id: 101,
    name: 'Ruwan Chamara',
    age: 26,
    university: 'University of Kelaniya',
    profession: 'Software Quality Assurance Engineer',
    district: 'Gampaha',
    verificationProof: 'Student ID Uploaded',
    createdAt: '2026-07-29'
  },
  {
    id: 102,
    name: 'Sewwandi Alwis',
    age: 24,
    university: 'University of Peradeniya',
    profession: 'Research Assistant (Agriculture)',
    district: 'Kandy',
    verificationProof: '.ac.lk Email Verified',
    createdAt: '2026-07-29'
  }
];

const ProposalsAdminTab = () => {
  const [proposals, setProposals] = useState(mockPendingProposals);

  const handleApprove = (id: number, name: string) => {
    setProposals(prev => prev.filter(p => p.id !== id));
    toast.success(`Approved & Verified Proposal for ${name}!`);
  };

  const handleReject = (id: number, name: string) => {
    setProposals(prev => prev.filter(p => p.id !== id));
    toast.error(`Rejected Proposal submission for ${name}.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Uni පොරොන්දම් Moderation Control</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Review and verify student proposals, degree certificates, and identity proofs.</p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-500 font-bold text-xs">
          {proposals.length} Pending Approval
        </span>
      </div>

      {proposals.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 font-medium text-xs">
          All Uni පොරොන්දම් proposals have been moderated!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proposals.map((p) => (
            <div key={p.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-black text-slate-900 dark:text-white">{p.name}, {p.age}</h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
                    {p.verificationProof}
                  </span>
                </div>
                <p className="text-xs text-rose-500 font-bold flex items-center gap-1">
                  <LuBriefcase size={12} /> {p.profession}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-1">
                  <LuGraduationCap size={12} /> {p.university} • 📍 {p.district}
                </p>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleApprove(p.id, p.name)}
                  className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider rounded-xl border-none cursor-pointer flex items-center justify-center gap-1"
                >
                  <LuCheck size={14} /> Approve & Verify
                </button>
                <button
                  onClick={() => handleReject(p.id, p.name)}
                  className="py-2.5 px-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-black text-xs uppercase tracking-wider rounded-xl border-none cursor-pointer transition-colors"
                >
                  <LuX size={14} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProposalsAdminTab;
