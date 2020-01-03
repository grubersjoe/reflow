
type ObjectType = {
  p1?: {
    p11: string;
    p12?: {
      p121: true;
    };
  };
  p2: undefined | {
    p21: number;
  };
};

const chaining: ObjectType = {
  p1: {
    p11: 'a',
    p12: {
      p121: true
    }
  },
  p2: undefined
};

chaining.p1;
chaining.p1?.p11;
chaining.p1?.p11;
chaining.p1?.p12?.p121;
chaining['p2']?.p21;
