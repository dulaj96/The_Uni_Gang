import React from 'react';
import { motion } from 'framer-motion';
import { LuTrophy, LuHeart, LuBookOpen } from 'react-icons/lu';
import { Contributor } from '../../types/blog';

interface ContributorLeaderboardProps {
  contributors: Contributor[];
}

const ContributorLeaderboard: React.FC<ContributorLeaderboardProps> = ({ contributors }) => {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/80">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <LuTrophy className="text-yellow-500" /> Contributor Leaderboard
        </h3>
        <span className="text-xs font-semibold text-slate-500">Top Monthly</span>
      </div>

      <div className="space-y-4">
        {contributors.map((contributor, index) => (
          <motion.div
            key={contributor.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between rounded-2xl border border-transparent p-3 transition-all hover:border-blue-500/20 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {index + 1}
              </div>
              <img
                src={contributor.avatar}
                alt={contributor.name}
                className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <div>
                <p className="font-bold text-slate-800 dark:text-white">{contributor.name}</p>
                <p className="text-xs text-slate-500">{contributor.university}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <LuBookOpen className="w-3 h-3" /> {contributor.blogsCount}
                </p>
                <p className="text-[10px] text-slate-500">Posts</p>
              </div>
              <div className="text-center">
                <p className="flex items-center gap-1 text-xs font-bold text-blue-600">
                  <LuHeart className="w-3 h-3" /> {contributor.totalLikes}
                </p>
                <p className="text-[10px] text-slate-500">Likes</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContributorLeaderboard;
