#include <stdio.h>
#include <string.h>

int strlonger(char *s, char *t) {
  return strlen(s) - strlen(t);
}

int main() {
  char a[] = "1231";
  char b[] = "123131";
  printf("%d, %u", strlonger(a, b), strlonger(a, b));
  return 0;
}
