#include <stdio.h>

int removeDuplicates(int *nums, int numsSize) {
  if (numsSize < 3) {
    return numsSize;
  }

  int left = 1;
  int index;
  for (index = 2; index < numsSize; index++) {
    if (nums[left] > nums[left - 1]) {
      left += 1;
      nums[left] = nums[index];
      continue;
    }

    // left equal left - 1
    while (index < numsSize && nums[left] == nums[index]) {
      index++;
    }

    if (index < numsSize) {
      left += 1;
      nums[left] = nums[index];
    }
  }
  return left + 1;
}
// 1, 1, 1, 2, 2, 3
// 1, 1],1!, 2, 2, 3 equal 1 skip
// 1, 1],1, 2!, 2, 3, move => 1, 1, 2], 2, 2,3,

int main() {
  // int nums[] = {0, 0, 1, 1, 1, 1, 2, 3, 3};
  int nums[] = {1, 1, 1};
  int len = sizeof(nums) / sizeof(int);
  int d = removeDuplicates(nums, len);
  printf("remove duplicates get result: %d\n", d);
  for (int i = 0; i < len; i++) {
    printf("%d,", nums[i]);
  }
  printf("\n");
  return 0;
}
