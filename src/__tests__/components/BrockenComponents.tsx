export const BrokenComponent = () => {
  throw new Error('Simulated crash');

  return <p>Brocken Component</p>;
};
