#include <stdlib.h>

typedef struct {
  struct Trie *chidren;
  char value;
} Trie;

Trie *trieCreate() {
  Trie *root = (Trie *)malloc(sizeof(Trie));
  root->value = '\0';
  root->chidren = NULL;
  return root;
}

#define MAX_LENGTH = 20

void trieInsert(Trie *root, char *word) {
  if (root->chidren == NULL) {
    // init 10 children first
    root->chidren = (Trie *)malloc(sizeof(Trie) * MAX_LENGTH);
  }
}

/*
bool trieSearch(Trie *obj, char *word) {}

bool trieStartsWith(Trie *obj, char *prefix) {}
*/

void trieFree(Trie *root) {
  while (root->chidren != NULL) {
    Trie *item = root->chidren;
    while (item != NULL) {
      trieFree(item);
      item++;
    }
  }
  free(root);
}

/**
 * Your Trie struct will be instantiated and called as such:
 * Trie* obj = trieCreate();
 * trieInsert(obj, word);

 * bool param_2 = trieSearch(obj, word);

 * bool param_3 = trieStartsWith(obj, prefix);

 * trieFree(obj);
*/
