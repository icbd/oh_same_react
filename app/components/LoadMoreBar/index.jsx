import "./style.scss";
import React from "react";
import PropTypes from "prop-types";

class LoadMoreBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const loadOver = this.props.loadOver || false;

        return (
            <div className="load-more-bar" ref="loadMore">
                {
                    loadOver
                        ?
                        <div className="load-over">
                            <span>没有更多了</span>
                        </div>
                        :
                        (
                            this.props.isLoading
                                ?
                                <div className="is-loading">
                                    <img src="/assets/img/loading.gif"/>
                                </div>
                                :
                                <div onClick={this.props.loadMoreFn} className="ready-loading">
                                    <span>加载更多</span>
                                </div>
                        )

                }
            </div>
        );
    }


    componentDidMount() {
        const loadMoreFn = this.props.loadMoreFn;
        const loadMoreDiv = this.refs.loadMore;

        let timeoutId;

        // 阻尼回调
        function dampCallback() {
            console.debug('dampCallback');
            const top = loadMoreDiv.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            if (top && top < (windowHeight * 2)) {
                loadMoreFn();
            }
        }

        window.addEventListener('scroll', function () {
            if (this.props.isLoading || this.props.loadOver) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(dampCallback, 50)
        }.bind(this), false);
    }

}

LoadMoreBar.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    loadOver: PropTypes.bool.isRequired,
    loadMoreFn: PropTypes.func.isRequired,
};

export default LoadMoreBar;