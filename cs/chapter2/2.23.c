#include <stdio.h>
#include "./show_bytes.c"

int fun1(unsigned word) {
  return (int) ((word << 24) >> 24);
}

int fun2(unsigned word) {
  return ((int) word << 24) >> 24;
}

int main() {
  unsigned word[] = {
    0x00000076,
    0x87654321,
    0x00000009,
    0xEDCBA987
  };

  for (int i = 0; i < 4; ++i) {
    int val1 = fun1(word[i]);
    int val2 = fun2(word[i]);

    printf("val1 = %d\t, val2 = %d\n", val1, val2);

    show_bytes((byte_pointer) &val1, sizeof(int));
    show_bytes((byte_pointer) &word[i], sizeof(int));
  }

  return 0;
}
