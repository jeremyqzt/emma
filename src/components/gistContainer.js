import GistRenderer from "./gistRenderer";

const GistContainer = (props) => {
  const allGists = props.gists || [];
  return (
    <>
      {!props.loading
        ? allGists.map((gist, idx) => (
            <GistRenderer
              addFavs={props.addFavs}
              gist={gist}
              key={`gist-${idx}`}
            />
          ))
        : null}
    </>
  );
};

export default GistContainer;
