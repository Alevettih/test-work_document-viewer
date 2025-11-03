export default {
  '^/api/documents': {
    target: 'http://localhost:4200',
    rewrite: (path: string): string => `${path}.json`
  },
};
