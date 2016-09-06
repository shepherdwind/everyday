#include <stdio.h>
#include "./show_bytes.c"

int main(int argc, char const *argv[]) {

  /*
   *int x = -2147483647;
   *unsigned u = 2147483648;
   *printf("%d\n", x - 1 == u);
   *printf("%d\n", x - 1 < 2147483647);
   *printf("%d\n", x - 1U < 2147483647);
   *printf("%d\n", x - 1 < x);
   *printf("%d, %u, %u\n", x - 1u, x - 1u, x);
   */

  short sx = -12345;
  unsigned short usx = sx;
  int x = sx;
  unsigned ux = usx;
  unsigned uy = sx;

/*
 *  printf("sx = %d:\t", sx);
 *  show_bytes((byte_pointer) &sx, sizeof(short));
 *
 *  printf("usx = %u:\t", usx);
 *  show_bytes((byte_pointer) &usx, sizeof(unsigned short));
 *
 *  printf("x = %u:\t", x);
 *  show_bytes((byte_pointer) &x, sizeof(int));
 *
 *  printf("ux = %u:\t", ux);
 *  show_bytes((byte_pointer) &ux, sizeof(unsigned));
 *
 *  printf("uy = %u:\t", uy);
 *  show_bytes((byte_pointer) &uy, sizeof(unsigned));
 */

  int t = -9;
  int tt = 9;
  show_bytes((byte_pointer) &t, sizeof(int));
  show_bytes((byte_pointer) &tt, sizeof(int));

  return 0;
}
