export function calculateCompatibility(user: any, profile: any) {
  let score = 50; // Base score
  let reasons: string[] = [];

  // District match
  if (user.district && profile.district && user.district === profile.district) {
    score += 15;
    reasons.push(`live in ${user.district}`);
  }

  // University match
  if (user.uni && profile.university && (profile.university.includes(user.uni) || user.uni.includes(profile.university))) {
    score += 12;
    reasons.push(`went to the same university`);
  }

  // Profession Sector match
  if (user.professionSector && profile.professionSector && user.professionSector === profile.professionSector) {
    score += 8;
    reasons.push(`work in the ${user.professionSector}`);
  }

  // Hobbies match
  const sharedHobbies = user.hobbies?.filter((h: string) => profile.hobbies?.includes(h)) || [];
  if (sharedHobbies.length > 0) {
    score += Math.min(sharedHobbies.length * 5, 15);
    if (sharedHobbies.length === 1) {
      reasons.push(`both love ${sharedHobbies[0]}`);
    } else {
      reasons.push(`both love ${sharedHobbies[0]} and ${sharedHobbies[1]}`);
    }
  }

  // Diet match
  if (user.diet && profile.diet && user.diet === profile.diet) {
    score += 5;
  }

  // Cap score at 99
  score = Math.min(score, 99);

  // Generate summary
  let summary = "";
  if (reasons.length > 0) {
    if (reasons.length === 1) {
      summary = `You two ${reasons[0]}.`;
    } else if (reasons.length === 2) {
      summary = `You two ${reasons[0]} and ${reasons[1]}.`;
    } else {
      summary = `You two ${reasons[0]}, ${reasons[1]}, and ${reasons.slice(2).join(', ')}.`;
    }
  } else {
    summary = "You both share some interesting commonalities!";
  }

  return {
    matchPercentage: score,
    matchSummary: summary
  };
}
