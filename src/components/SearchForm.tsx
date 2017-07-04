import * as React from 'react';
import { Accordion, Icon, Form } from 'semantic-ui-react';

const SORT_OPTIONS = [
  {
    key: 'best_match',
    text: 'Best match',
    value: 'best_match',
  },
  { key: 'stars', text: 'Most stars', value: 'stars' },
  { key: 'forks', text: 'Most forks', value: 'forks' },
  {
    key: 'updated',
    text: 'Recentely updated',
    value: 'updated',
  },
];

const LANGUAGE_LIST = [
  { key: 'any', text: 'Any Language', value: 'any' },
  {
    key: 'ActionScript',
    text: 'ActionScript',
    value: 'ActionScript',
  },
  { key: 'C', text: 'C', value: 'C' },
  { key: 'C#', text: 'C#', value: 'C#' },
  { key: 'C++', text: 'C++', value: 'C++' },
  { key: 'Clojure', text: 'Clojure', value: 'Clojure' },
  {
    key: 'CoffeeScript',
    text: 'CoffeeScript',
    value: 'CoffeeScript',
  },
  { key: 'CSS', text: 'CSS', value: 'CSS' },
  { key: 'Go', text: 'Go', value: 'Go' },
  { key: 'Haskell', text: 'Haskell', value: 'Haskell' },
  { key: 'HTML', text: 'HTML', value: 'HTML' },
  { key: 'Java', text: 'Java', value: 'Java' },
  {
    key: 'JavaScript',
    text: 'JavaScript',
    value: 'JavaScript',
  },
  { key: 'Lua', text: 'Lua', value: 'Lua' },
  { key: 'Matlab', text: 'Matlab', value: 'Matlab' },
  {
    key: 'Objective-C',
    text: 'Objective-C',
    value: 'Objective-C',
  },
  { key: 'Perl', text: 'Perl', value: 'Perl' },
  { key: 'PHP', text: 'PHP', value: 'PHP' },
  { key: 'Python', text: 'Python', value: 'Python' },
  { key: 'R', text: 'R', value: 'R' },
  { key: 'Ruby', text: 'Ruby', value: 'Ruby' },
  { key: 'Scala', text: 'Scala', value: 'Scala' },
  { key: 'Shell', text: 'Shell', value: 'Shell' },
  { key: 'Swift', text: 'Swift', value: 'Swift' },
  { key: 'TeX', text: 'TeX', value: 'TeX' },
  {
    key: 'Vim script',
    text: 'Vim script',
    value: 'Vim script',
  },
];

export interface SearchFormProps {
  onChange?: (ev: any) => void;
}

export class SearchForm extends React.Component<SearchFormProps, undefined> {
  render() {
    return (
      <Form>
        <Form.Input icon="search" iconPosition="left" placeholder="Search" />
        <Accordion fluid>
          <Accordion.Title>
            <Icon name="dropdown" />
            Advanced Search
          </Accordion.Title>
          <Accordion.Content>
            <Form.Group widths="equal">
              <Form.Select
                label="Sort options"
                options={SORT_OPTIONS}
                defaultValue="best_match"
              />
              <Form.Select
                label="Language"
                options={LANGUAGE_LIST}
                defaultValue="any"
              />
            </Form.Group>
          </Accordion.Content>
        </Accordion>
      </Form>
    );
  }
}
