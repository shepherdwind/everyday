#include <stdio.h>
#include <string.h>

typedef unsigned char *byte_pointer;

void inplace_swap(int *x, int *y) {
  *y = *x ^ *y;
  *x = *x ^ *y;
  *y = *x ^ *y;
}

void show_bytes(byte_pointer start, int len) {
  int i;
  for (i = 0; i < len; i++)
    printf("%.2x", start[i]);
  printf("\n");
}

void show_array(int a[], int len) {
  int i;
  for (i = 0; i < len; i++)
    printf("%d", a[i]);
  printf("\n");
}

void show_int(int x) {
  show_bytes((byte_pointer) &x, sizeof(x));
}

void reverse_array(int a[], int cnt) {
  int first, last;
  for (first = 0, last = cnt - 1;
      first < last;
      first++, last--)
    inplace_swap(&a[first], &a[last]);
}

int main() {
  int a[] = {1,2,3,4, 5};

  reverse_array(a, 5);
  show_array(a, 5);
  return 0;
}
