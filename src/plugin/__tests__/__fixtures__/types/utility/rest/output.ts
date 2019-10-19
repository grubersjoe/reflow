
type O1 = {
  p1: string;
  p2: number;
};

type RestSimpleExact = Omit<O1, "p1">;
type RestSimple = Omit<O1, "p1">;

type O2 = {
  p1: string;
  p2: number;
  p3: boolean;
};

type Rest = Omit<O2, "p1" | "p3">;

type RestNonSense = Omit<O1, number>;
