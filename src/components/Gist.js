'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { Icon, Tooltip } from 'antd';

const GistContainer = styled.div`
  .item {
    padding: 10px;
    border-bottom: 1px solid #eaeaea;
    &:hover,
    &.selected {
      background: #ecf6fd;
    }
    .name {
      font-size: 16px;
      color: #000;
      .anticon {
        font-size: 14px;
        margin-right: 5px;
      }
    }
    .date {
      font-size: 12px;
      color: #999;
    }
    .description {
      font-size: 14px;
      color: #666;
      margin: 10px 0;
    }
    .tags {
      font-size: 12px;
      color: #999;
      span {
        margin-right: 10px;
        .anticon {
          margin-right: 5px;
        }
      }
    }
  }
`;

class Gist extends React.Component {
  render() {
    let { list } = this.props;
    let { getGistsOpen } = this.props.store;
    return (
      <GistContainer>
        {list.map(gist => {
          return (
            <div
              className="item hand"
              key={gist.id}
              onClick={getGistsOpen.bind(this, gist.id, e => e)}
            >
              <div className="name text-ellipsis">
                {gist.public ? (
                  <Tooltip placement="bottom" title="Public">
                    <Icon type="unlock" />
                  </Tooltip>
                ) : (
                  <Tooltip placement="bottom" title="Private">
                    <Icon type="lock" />
                  </Tooltip>
                )}
                {gist.name || 'No Name'}
              </div>
              <div className="date">
                Created: {moment(gist.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </div>
              <div className="description text-ellipsis">
                {gist.description || 'No Description'}
              </div>
              <div className="tags clearfix">
                {gist.tags.length > 0
                  ? gist.tags.map(tag => (
                      <span className="fl" key={tag}>
                        <Icon type="tags" />
                        {tag}
                      </span>
                    ))
                  : 'No Labels'}
              </div>
            </div>
          );
        })}
      </GistContainer>
    );
  }
}

Gist.propTypes = {
  store: PropTypes.object,
  list: PropTypes.object.isRequired,
};

export default inject('store')(observer(Gist));