'use strict';

var React = require('react-native');
var ContactCell = require('./ContactCell');
var ContactListSectionHeader = require('./ContactListSectionHeader');
var {
  StyleSheet,
  ListView
} = React;

var ContactList = React.createClass({
    getInitialState: function() {
    var getSectionData = (data, sectionID) => {
      return data[sectionID];
    };
    var getRowData = (data, sectionID, rowID) => {
      return data[rowID];
    };

    var dataSource = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    var data = {};
    var sectionIDs = [];
    var rowIDs = [];
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    for (var i = 0; i < alphabet.length; i++) {
      var filteredContacts = this.props.contacts.filter((contact) => {
        return contact.lastName.toUpperCase().indexOf(alphabet[i]) === 0;
      });

      if (filteredContacts.length > 0) {
        var currentChar = alphabet[i];
        var nextRowIDs = rowIDs.length;

        sectionIDs.push(currentChar);
        data[currentChar] = currentChar;
        rowIDs[nextRowIDs] = [];

        for (var j = 0; j < filteredContacts.length; j++) {
          var rowName = `S${i}R${j}`;
          rowIDs[nextRowIDs].push(rowName);
          data[rowName] = filteredContacts[j];
        }
      }
    }
    return {
      dataSource: dataSource.cloneWithRowsAndSections(data, sectionIDs, rowIDs),
    };
  },

  renderRow: function(rowdata) {
    return <ContactCell contact={rowdata}/>;
  },

  renderSectionHeader: function(sectionData) {
    return <ContactListSectionHeader text={sectionData}/> ;
  },

  render: function() {
    return <ListView style={styles.listview} dataSource={this.state.dataSource} renderRow={this.renderRow} renderSectionHeader={this.renderSectionHeader}/>;
  }
});

var styles = StyleSheet.create({
  listview: {
    paddingTop: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  }
});

module.exports = ContactList;
