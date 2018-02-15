import React from 'react';
import { graphql } from 'react-apollo';
import { CircularProgress } from 'material-ui/Progress';

import { categoryChildren as query } from '../../queries';
import { ListCard } from '../../../../components/cards';

const categoryChildrenQuery = graphql(query, {
  options: (props) => {
    const { pk, rowsPerPage, cursor, action } = props;
    const options = {
      variables: {
        pk: pk
      },
      fetchPolicy: 'network-only'
    };
    switch (action) {
      case 'prev':
        options.variables.last = rowsPerPage;
        options.variables.before = cursor;
        options.variables.first = null;
        options.variables.after = null;
        break;
      case 'next':
        options.variables.first = rowsPerPage;
        options.variables.after = cursor;
        options.variables.last = null;
        options.variables.before = null;
        break;
    }
    return options;
  }
});

export default categoryChildrenQuery((props) => {
  const {
    data: { loading, categories },
    pk,
    page,
    rowsPerPage,
    handleNewCategoryClick,
    handleChangePage,
    handleChangeRowsPerPage
  } = props;
  const firstCursor = (!loading && categories.edges.length) ? categories.edges[0].cursor : '';
  const lastCursor = (!loading && categories.edges.length) ? categories.edges.slice(-1)[0].cursor : '';
  const headers = [
    {
      name: 'name',
      label: 'Name',
      noDataText: 'No name'
    },
    {
      name: 'description',
      label: 'Description',
      noDataText: 'No description',
      wide: true
    }
  ];
  return (
    <div>
      {loading && (
        <CircularProgress
          size={80}
          thickness={5}
          color={'secondary'}
        />
      )}
      {!loading && (
        <ListCard
          firstCursor={firstCursor}
          lastCursor={lastCursor}
          page={page}
          rowsPerPage={rowsPerPage}
          headers={headers}
          list={categories.edges.map((edge) => edge.node)}
          displayLabel={pk}
          handleAddAction={handleNewCategoryClick}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          label={pgettext('Category list subcategories', 'Subcategories')}
          addActionLabel={pgettext('Category list add category', 'Add')}
          noDataLabel={pgettext('Empty category list message', 'No categories found.')}
        />
      )}
    </div>
  );
});