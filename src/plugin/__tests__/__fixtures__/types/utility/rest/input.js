// @flow
type O1 = {
  p1: string,
  p2: number,
};

type RestSimpleExact = $Rest<O1, {| p1: string |}>;
type RestSimple = $Rest<O1, { p1: string }>;

type O2 = {
  p1: string,
  p2: number,
  p3: boolean,
};

type Rest = $Rest<O2, {| p1: string, p3: boolean |}>;

type RestNonSense = $Rest<O1, number>;
