#include <stdio.h>

float  sum_elements(float a[], unsigned len) {
  int i;
  float result = 0;

  for (i = 0; i <= (int)(len - 1); i++)
    result += a[i];
  return result;
}

int main(int argc, char const *argv[])
{
  float a[] = { 1.1, 1.2 };
  float s = sum_elements(a, 0);
  printf("%f\n", s);
  /*unsigned a = 0;*/
  /*printf("%u\n", a - 1);*/
  /*printf("%d\n", a - 1);*/
  return 0;
}
