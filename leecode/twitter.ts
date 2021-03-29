
class Twitter {
  private uid = 0;
  private store: {
    [key: number]: Array<{
      tweetId: number;
      order: number;
    }>;
  } = {};
  private followStore: {
    [key: number]: { [key: number]: number };
  } = {};

  constructor() {}

  postTweet(userId: number, tweetId: number): void {
    let store = this.store[userId];
    const uid = this.uid++;
    if (!store) {
      store = [];
      this.store[userId] = store;
      this.follow(userId, userId);
    }
    store.unshift({ tweetId, order: uid });
  }

  getNewsFeed(userId: number): number[] {
    const tweets = [];
    const follow = this.followStore[userId];
    if (!follow) {
      return [];
    }

    Object.keys(follow).forEach(userId => {
      const tweet = this.store[userId];
      if (tweet && tweet.length) {
        tweets.push(tweet);
      }
    });
    return mergeTweets(tweets);
  }

  follow(followerId: number, followeeId: number): void {
    let store = this.followStore[followerId];
    if (!store) {
      store = {};
      this.followStore[followerId] = store;
    }
    store[followeeId] = followeeId;
  }

  unfollow(followerId: number, followeeId: number): void {
    const store = this.followStore[followerId];
    if (followeeId === followerId) {
      return;
    }
    if (store && store[followeeId]) {
      delete store[followeeId];
    }
  }
}

function mergeTweets(tweets: Array<{ order: number; tweetId: number}>[]) {
  const result: number[] = [];
  let isEnd = false;
  const indexMap = tweets.map(_o => 0);
  const len = tweets.length;
  while (!isEnd) {
    let maxOrder = -1;
    let index = -1;

    isEnd = true;
    for (let i = 0; i < len; i++) {
      const first = tweets[i][indexMap[i]];
      if (!first) {
        continue;
      }

      isEnd = false;

      if (maxOrder < first.order) {
        maxOrder = first.order;
        index = i;
      }
    }

    if (index > -1) {
      const item = tweets[index][indexMap[index]];
      indexMap[index] += 1;
      result.push(item.tweetId);
    }
    if (result.length >= 10) {
      isEnd = true;
    }
  }
  return result;
}

function runIt(cmd: string[], data: number[][]) {
  const twitter = new Twitter();
  cmd.shift();
  data.shift();
  for (let i = 0; i < cmd.length; i++) {
    const ret = twitter[cmd[i]](...data[i]);
    console.log(cmd[i], data[i]);
    if (cmd[i] === 'getNewsFeed') {
      console.log(ret);
    }
  }
}

(() => {
  // const twitter = new Twitter();
  // twitter.postTweet(1, 5);
  // console.log(twitter.getNewsFeed(1));
  // twitter.follow(1, 2);
  // twitter.postTweet(2, 6);
  // console.log(twitter.getNewsFeed(1));
  // twitter.unfollow(1, 2);
  // console.log(twitter.getNewsFeed(1));
  const c = ["Twitter","postTweet","follow","follow","getNewsFeed","postTweet","getNewsFeed","getNewsFeed","unfollow","getNewsFeed","getNewsFeed","unfollow","getNewsFeed","getNewsFeed"];
  const b = [[],[1,5],[1,2],[2,1],[2],[2,6],[1],[2],[2,1],[1],[2],[1,2],[1],[2]];
  runIt(c, b);
})();