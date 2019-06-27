// @flow
type TPropertyType = {
  p: Date,
};

type PropertyType = $PropertyType<TPropertyType, 'p'>;
type PropertyTypeLiteral = $PropertyType<{
  p: null,
}, 'p'>


type PropertyTypeNonExisting = $PropertyType<TPropertyType, 'q'>;

