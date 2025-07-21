interface Props {
  onClick: () => void;
}

export const SimulateErrorButton = (props: Props) => {
  return (
    <button className="btn btn-rose" onClick={props.onClick}>
      Throw Simulated Error
    </button>
  );
};
