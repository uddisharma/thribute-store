export const calculateEarnedAmount = (referrals: any) => {
  let earnedAmount = 0;
  let trueCount = 0;
  let falseCount = 0;

  referrals.forEach((referral: any) => {
    if (referral.status && referral.onboarded) {
      earnedAmount += referral.amount;
      trueCount++;
    } else {
      falseCount++;
    }
  });

  return { earnedAmount, trueCount, falseCount };
};
