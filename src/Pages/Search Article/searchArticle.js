import React from "react";
import axios from "axios";
import TableCustom from "../../service/tableCustom/table";
import { toast } from "react-toastify";
import withRouter from "../../HOC/withRouter";
import InfiniteScroll from "react-infinite-scroll-component";
import { checkLogin, formatPriceVND } from "../../service/service";
import "./searchArticle.css";

class SearchArtikel extends React.Component {
  state = {
    searchCode: "",
    results: [],
    page: 1,
    hasMore: false,
    loading: false,
    redirectToLogin: false,
    redirect: false,
    searchActive: false,
  };

  componentDidMount() {
    if (!checkLogin()) {
      this.setState({ redirectToLogin: true });
    } else {
      const role = sessionStorage.getItem("role");
      if (!["admin", "sales", "accounting"].includes(role)) {
        this.setState({ redirect: true });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { redirectToLogin, redirect } = this.state;

    if (redirectToLogin && !prevState.redirectToLogin) {
      toast.warning("🔒 Please login to continue");
      this.props.router.navigate("/login");
    }

    if (redirect && !prevState.redirect) {
      toast.warning("🚫 You do not have permission to access this page");
      this.props.router.navigate(-1);
    }
  }

  handleSearch = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.setState(
      {
        results: [],
        page: 1,
        hasMore: true,
        loading: true,
        searchActive: true,
      },
      () => this.fetchMoreData(true)
    );
  };

  fetchMoreData = async (isFirstLoad = false) => {
    const { searchCode, page, results } = this.state;
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL_API_LOCAL}/article`,
        {
          params: {
            code: searchCode,
            page: page,
            limit: 20,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      const newData = response.data.map((item) => [
        item.Code,
        item.Description,
        formatPriceVND(item.PriceTM),
        formatPriceVND(item.PriceDealer),
        formatPriceVND(item.PriceEnduser),
      ]);

      if (isFirstLoad && newData.length === 0) {
        toast.info(`❗ No articles found for code "${searchCode}"`);
        this.setState({
          results: [],
          hasMore: false,
          loading: false,
        });
        return;
      }

      this.setState({
        results: [...results, ...newData],
        page: page + 1,
        hasMore: newData.length > 0,
        loading: false,
      });
    } catch (error) {
      toast.error("❌ Error fetching search results");
      this.setState({ hasMore: false, loading: false });
      console.log("Error fetching articles:", error);
    }
  };

  render() {
    const { searchCode, results, loading, hasMore, searchActive } = this.state;
    const headers = [
      "Code",
      "Description",
      "Price TM",
      "Price Dealer",
      "Price Enduser",
    ];

    return (
      <div className="artikel-container">
        <form onSubmit={this.handleSearch} className="artikel-form">
          <label className="form-label-article">🔍 Article Code</label>
          <div className="input-group">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => this.setState({ searchCode: e.target.value })}
              className="form-control search-input"
              placeholder="Enter article code..."
            />
            <button className="btn search-button" type="submit">
              Search
            </button>
          </div>
        </form>

        {loading && results.length === 0 ? (
          <div className="text-center mt-4">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="table-scroll-container" id="scrollableDiv">
            <InfiniteScroll
              dataLength={results.length}
              next={this.fetchMoreData}
              hasMore={hasMore}
              scrollableTarget="scrollableDiv"
              loader={
                <h6 className="text-warning text-center mt-3">
                  Loading more...
                </h6>
              }
              endMessage={
                <div className="no-results mt-4">
                  <span> ✅ All results loaded.</span>
                </div>
              }
            >
              <TableCustom headers={headers} data={results} />
            </InfiniteScroll>
          </div>
        ) : searchActive ? (
          <div className="no-results mt-4">
            <span>
              ❗ No article matched with code "<b>{searchCode}</b>"
            </span>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(SearchArtikel);
