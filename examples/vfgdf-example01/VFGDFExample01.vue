<!-- eslint-disable vue/no-v-html -->
<template>
  <div id="app">
    <h1 class="text-center">
      Demo of VFG Display Fields<br>with vue-form-generator
      <button @click="showForm = !showForm">
        {{ showForm?'Display Fields':'Show Form' }}
      </button>
    </h1>
    <div
      id="app"
      class="container"
    >
      <div
        v-if="!showForm"
        class="panel panel-default"
      >
        <div
          class="panel-heading"
          style="background-color: lightgreen;"
        >
          VFG Display Fields (from what is in the form)
        </div>
        <div class="panel-body">
          <display-fields
            :schema="schema"
            :obj="model"
            :options="options"
          />
        </div>
      </div>

      <template v-else>
        <div class="panel panel-default">
          <div class="panel-heading">
            Form (changes here will be reflected in Display Fields)
          </div>
          <div class="panel-body">
            <vue-form-generator
              :schema="schema"
              :model="model"
              :options="formOptions"
            />
          </div>
        </div>

        <div class="panel panel-default">
          <div class="panel-heading">
            Model
          </div>
          <div class="panel-body">
            <pre
              v-if="model"
              v-html="prettyJSON(model)"
            />
          </div>
        </div>

        <div class="panel panel-default">
          <div class="panel-heading">
            Schema
          </div>
          <div class="panel-body">
            <pre
              v-if="model"
              v-html="prettyJSON(schema)"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import VueFormGenerator from 'vue-form-generator';
import { DisplayFields } from '../../src/DisplayFields.vue';

export default {
  name: 'App',
  components: {
    'vue-form-generator': VueFormGenerator.component,
    'display-fields': DisplayFields,
  },

  data() {
    return {
      showForm: false,
      model: {
        id: 1,
        name: 'John Doe',
        password: 'J0hnD03!x4',
        age: 35,
        skills: ['Javascript', 'VueJS'],
        email: 'john.doe@gmail.com',
        status: true,
        roles: ['moderator', 'user'],
        available: false,
        address: {
          street: 'Main Street',
          city: 'Brisbane',
          country: 'Australia',
        },
        friend: 'Paul',
        lang: 'de',
        // eslint-disable-next-line max-len
        bio: "It sounds obvious but much of a lecturer's work involves public speaking in front of audiences ranging from two or three people",
        color: '#369C',
        date: '1945-10-04',
      },
      schema: {
        fields: [{
          type: 'input',
          inputType: 'text',
          label: 'ID',
          model: 'id',
          readonly: true,
          featured: false,
          disabled: true,
        }, {
          type: 'input',
          inputType: 'text',
          label: 'Name',
          model: 'name',
          readonly: false,
          featured: true,
          required: true,
          disabled: false,
          placeholder: "User's name",
          validator: VueFormGenerator.validators.string,
        }, {
          type: 'input',
          inputType: 'password',
          label: 'Password',
          model: 'password',
          min: 6,
          required: true,
          hint: 'Minimum 6 characters',
          validator: VueFormGenerator.validators.string,
        }, {
          type: 'input',
          inputType: 'number',
          label: 'Age',
          model: 'age',
          min: 18,
          validator: VueFormGenerator.validators.number,
        }, {
          type: 'input',
          inputType: 'email',
          label: 'E-mail',
          model: 'email',
          placeholder: "User's e-mail address",
          validator: VueFormGenerator.validators.email,
        }, {
          type: 'switch',
          label: 'Status',
          model: 'status',
          multi: true,
          readonly: false,
          featured: false,
          disabled: false,
          default: true,
          textOn: 'Active',
          textOff: 'Inactive',
        }, {
          type: 'checkbox',
          label: 'Available now',
          model: 'available',
        }, {
          type: 'input',
          inputType: 'text',
          label: 'Street',
          model: 'address.street',
        }, {
          type: 'input',
          inputType: 'text',
          label: 'City',
          model: 'address.city',
        }, {
          type: 'input',
          inputType: 'text',
          label: 'Country',
          model: 'address.country',
        }, {
          type: 'radios',
          label: 'Very best friend',
          model: 'friend',
          values: [
            'James',
            'Nadia',
            'Paul',
            'Christelle',
            'Marc',
            'Marie',
          ],
        }, {
          type: 'select',
          label: 'Language',
          model: 'lang',
          required: true,
          values: [
            {
              id: 'en-GB',
              name: 'English (GB)',
            },
            {
              id: 'en-US',
              name: 'English (US)',
            },
            {
              id: 'de',
              name: 'German',
            },
            {
              id: 'it',
              name: 'Italian',
            },
            {
              id: 'fr',
              name: 'French',
            },
          ],
          default: 'en-US',
          validator: 'required',
        }, {
          type: 'input',
          inputType: 'color',
          label: 'Colour',
          model: 'color',
        }, {
          type: 'input',
          inputType: 'date',
          label: 'Date & time',
          model: 'date',
        }],
        groups: [
          {
            legend: 'Experience',
            fields: [
              {
                type: 'checklist',
                label: 'Skills',
                model: 'skills',
                multi: true,
                required: true,
                multiSelect: true,
                // eslint-disable-next-line max-len
                values: ['HTML5', 'Javascript', 'CSS3', 'CoffeeScript', 'AngularJS', 'ReactJS', 'VueJS'],
              }, {
                type: 'checklist',
                label: 'Roles',
                model: 'roles',
                values: [{
                  value: 'admin',
                  name: 'Administrator',
                },
                {
                  value: 'moderator',
                  name: 'Moderator',
                },
                {
                  value: 'user',
                  name: 'Registered User',
                },
                {
                  value: 'visitor',
                  name: 'Visitor',
                },
                ],
                checklistOptions: {},
              }, {
                type: 'textArea',
                label: 'Biography',
                model: 'bio',
                hint: 'Max 500 characters',
                max: 500,
                placeholder: 'User\'s biography',
                rows: 4,
                validator: 'string',
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
      },

      options: {
        stylePrefix: 'results',
        showNulls: false,
        fieldsOptions: {
          shorttext: { hidden: true },
          ldid: { hidden: true },
        },
      },
    };
  },

  methods: {
    prettyJSON(json) {
      if (json) {
        /* eslint-disable no-param-reassign */
        json = JSON.stringify(json, undefined, 4);
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        /* eslint-enable no-param-reassign */
        // eslint-disable-next-line no-useless-escape, max-len
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
          let cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            } else {
              cls = 'string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return `<span class="${cls}">${match}</span>`;
        });
      }
      return null;
    },
  },
};

</script>

<style>
html {
  font-family: Tahoma;
  font-size: 14px;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}

pre {
  overflow: auto;
}
  pre .string { color: #885800; }
  pre .number { color: blue; }
  pre .boolean { color: magenta; }
  pre .null { color: red; }
  pre .key { color: green; }

h1 {
  text-align: center;
  font-size: 36px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 500;
}

fieldset {
  border: 0;
}

.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  border-color: #ddd;
}

.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;

  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}

.field-checklist .wrapper {
  width: 100%;
}

.resultsOverall {margin: 0; font-size: 12px}
.resultsName {color: DarkCyan; margin-bottom: 1px;}
.resultsValue {color: black;}
.resultsListName {color: DarkCyan;}
.resultsListValue {color: black; margin-left: 3px;}
.resultsGroup {margin-left: 6px;}
.resultsGroupLegend {
  color: rgb(35, 6, 165);
  margin-top: 1px;
  text-decoration: underline;
}

</style>
