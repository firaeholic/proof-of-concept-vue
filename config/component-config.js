// Component configuration for different page types
export const COMPONENT_CONFIG = {
  input: {
    basic: {
      wrappers: [
        {
          attrs: {
            'wrapper-id': 'outer-wrapper',
            class: ['basic-outer'],
            'data-mode': 'basic'
          }
        },
        {
          attrs: {
            'wrapper-id': 'second-p',
            class: ['basic-inner'],
            'data-mode': 'basic'
          }
        }
      ],
      field: {
        attrs: {
          class: ['basic-input'],
          placeholder: 'Type…',
          'data-basic-field': 'true'
        }
      }
    },
    dash: {
      wrappers: [
        {
          attrs: {
            'wrapper-id': 'outer-wrapper',
            class: ['dash-outer'],
            'data-mode': 'dash',
            'data-dash-wrap': 'fds'
          }
        },
        {
          attrs: {
            'wrapper-id': 'second-p',
            class: ['dash-inner'],
            'data-mode': 'dash',
            'data-dash-wrap': 'gfd'
          }
        }
      ],
      field: {
        attrs: {
          class: ['dash-input'],
          placeholder: 'Dashboard…',
          'data-dashboard': 'hgf'
        }
      }
    },
    profile: {
      wrappers: [
        {
          attrs: {
            'wrapper-id': 'outer-wrapper',
            class: ['profile-outer'],
            'data-mode': 'profile',
            'data-profile-wrap': 'jhg'
          }
        },
        {
          attrs: {
            'wrapper-id': 'second-p',
            class: ['profile-inner'],
            'data-mode': 'profile',
            'data-profile-wrap': 'kjh'
          }
        }
      ],
      field: {
        attrs: {
          class: ['profile-input'],
          placeholder: 'Profile…',
          'data-profile': 'true'
        }
      }
    }
  },
  textarea: {
    basic: {
      wrappers: [
        {
          attrs: {
            'wrapper-id': 'outer-wrapper',
            class: ['basic-outer'],
            'data-mode': 'basic'
          }
        },
        {
          attrs: {
            'wrapper-id': 'second-p',
            class: ['basic-inner'],
            'data-mode': 'basic'
          }
        }
      ],
      field: {
        attrs: {
          class: ['basic-textarea'],
          placeholder: 'Type…',
          'data-basic-field': 'true'
        }
      }
    },
    dash: {
      wrappers: [
        {
          attrs: {
            'wrapper-id': 'outer-wrapper',
            class: ['dash-outer'],
            'data-mode': 'dash',
            'data-dash-wrap': 'fds'
          }
        },
        {
          attrs: {
            'wrapper-id': 'second-p',
            class: ['dash-inner'],
            'data-mode': 'dash',
            'data-dash-wrap': 'gfd'
          }
        }
      ],
      field: {
        attrs: {
          class: ['dash-textarea'],
          placeholder: 'Dashboard notes…',
          'data-dashboard': 'true'
        }
      }
    },
    profile: {
      wrappers: [
        {
          attrs: {
            'wrapper-id': 'outer-wrapper',
            class: ['profile-outer'],
            'data-mode': 'profile',
            'data-profile-wrap': 'outer'
          }
        },
        {
          attrs: {
            'wrapper-id': 'second-p',
            class: ['profile-inner'],
            'data-mode': 'profile',
            'data-profile-wrap': 'inner'
          }
        }
      ],
      field: {
        attrs: {
          class: ['profile-textarea'],
          placeholder: 'Profile notes…',
          'data-profile': 'true'
        }
      }
    }
  }
};