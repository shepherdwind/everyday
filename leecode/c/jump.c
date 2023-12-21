#include <stdlib.h>

int jump(int *nums, int numsSize) {
  int i, j, distance;
  int *dp = calloc(numsSize, sizeof(int));

  for (i = numsSize - 2; i >= 0; i--) {
    j = nums[i];
    distance = numsSize - 1 - i;
    if (j >= distance) {
      dp[i] = 1;
      continue;
    }

    for (int s = 1; s <= j; s++) {
      int next = dp[i + s];
      if (next > 0 && (dp[i] > next + 1 || !dp[i])) {
        dp[i] = next + 1;
      }
    }
  }

  int step = dp[0];
  free(dp);
  return step;
}
