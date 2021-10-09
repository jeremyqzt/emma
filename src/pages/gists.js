import { useState } from "react";
import { useApi } from "../hooks/hooks";

import Header from "../components/header";
import GistContainer from "../components/gistContainer";
import GistFavouritesContainer from "../components/favouriteGists";
import Container from "react-bootstrap/Container";

import Loading from "../components/loading";
import NoUser from "../components/noUser";
import NoGists from "../components/noGists";
import NoSearch from "../components/noSearches";

import { TAB } from "../utils/constants";

const Gist = () => {
  const [url, setUrl] = useState("");
  const [results, loading, refresh] = useApi(url);

  const [tab, setTab] = useState(TAB.SEARCH);
  const [favs, setFavs] = useState([]);

  const onClickSearch = (name) => {
    setUrl(`GET /users/${name}/gists`);
  };

  const onClickAddFavs = (gist) => {
    setFavs([{ ...gist }, ...favs]);
  };

  const onClickRemoveFavs = (gist) => {
    setFavs([]);
  };

  const noUser = results && results.status === 404 && !loading && url !== "";
  const noGists =
    results && results.data?.length === 0 && !loading && url !== "";

  console.log(favs);
  return (
    <>
      <Header
        loading={loading}
        onClickSearch={onClickSearch}
        onRefresh={refresh}
        tab={tab}
        setTab={setTab}
      />
      {tab === TAB.SEARCH ? (
        <Container>
          <>
            {url === "" ? <NoSearch /> : null}
            {loading ? <Loading /> : null}
            {noUser ? <NoUser /> : null}
            {noGists ? <NoGists /> : null}

            {!noUser && !noGists && !loading ? (
              <GistContainer
                gists={results?.data}
                loading={loading}
                addFavs={onClickAddFavs}
              />
            ) : null}
          </>
        </Container>
      ) : (
        <Container>
          <GistFavouritesContainer favourites={favs} />
        </Container>
      )}
    </>
  );
};

export default Gist;
