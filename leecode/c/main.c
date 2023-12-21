#include "./jump.c"
#include <stdio.h>
int main() {
  int nums[] = {2, 3, 0, 1, 4};
  int len = sizeof(nums) / sizeof(int);
  int d = jump(nums, len);
  printf("get jump result: %d\n", d);
  return 0;
}
