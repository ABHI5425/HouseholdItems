let subscriptions = [];

module.exports = {
  getAll: () => subscriptions,
  add: (subscription) => {
    // Avoid duplicate subscriptions
    const exists = subscriptions.find(sub => sub.endpoint === subscription.endpoint);
    if (!exists) subscriptions.push(subscription);
  }
};
