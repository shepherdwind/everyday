#include <stdio.h>
void merge(int *nums1, int nums1Size, int m, int *nums2, int n) {
  int i, j, pos;
  i = m - 1;
  j = n - 1;
  pos = m + n - 1;

  while (pos >= 0 && j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[pos] = nums1[i];
      i--;
    } else {
      nums1[pos] = nums2[j];
      j--;
    }
    pos--;
  }
}

int main() {
  int nums1[] = {1, 2, 3, 0, 0, 0};
  int nums2[] = {2, 5, 6};
  int len = 6;
  merge(nums1, len, 3, nums2, 3);
  printf("result:");
  for (int i = 0; i < len; i++) {
    printf("%d,", nums1[i]);
  }
  printf("\n");
  return 0;
}
