# Options

Available options for display-fields

Property               | Default    | Type        | Description
--------------------   | ---------- | ----------  | -----------
stylePrefix      | 'result'    | `string`   | Prefix to CSS classes used (see below)
showNulls   | true    | `boolean`   | Explicitly show fields that are null or undefined
fieldsOptions          | null     | `object`    | See below

## Styles

Fields that have a single value are displayed on a single line: Label (or name) followed by the text (or value).

Those fields that (potentially) have multiple values are displayed on multiple lines, with the label (or name) first, followed by zero or more texts (or values).

The CSS classes used by vfg-display-fields should be defined somewhere in your application. They are (assuming stylePrefix has its default value of 'result'):

- resultsOverall - applied to all Display Fields elements (in addition to one of the following)
- resultsName - for single line labels (or names)
- resultsValue - for single line texts (or values)
- resultsListName - for multiple line labels (or names)
- resultsListValue - for multiple line texts (or values)

- resultsGroup - applied to all groups - as well as resultsOverall (in addition to one of the following)
- resultsGroupLegend - for legends (or headings for groups)

## fieldsOptions

fieldsOptions is an object, with a property for each field for which you want to specify special options. Currently the available field options are:

Property               | Default    | Type        | Description
--------------------   | ---------- | ----------  | -----------
hidden      | false    | `boolean`   | Hide this field?

For example to hide all fields called shorttext and ldid:

```js
{
    fieldsOptions: {
        shorttext: { hidden: true },
        ldid: { hidden: true },
    },
}
```
