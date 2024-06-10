<template>
    <div  @mouseenter="showTooltip" @mouseleave="hideTooltip">
      <slot></slot>
      <div v-if="visible" class="tooltip text-black text-sm absolute px-3 py-5 bg-cyan-400" >
        {{ text }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      text: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        visible: false,
        tooltipStyle: {
          top: '0px',
          left: '0px',
        },
      };
    },
    methods: {
      showTooltip(event) {
        this.visible = true;
      //  alert(event.clientY )
        this.tooltipStyle = {
          top: `${event.clientY + 5}px`,
          left: `${event.clientX + 5}px`,
        };
      },
      hideTooltip() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style>
  .tooltip-container {
    position: relative;
    display: inline-block;
  }
  
  .tooltip {
    position: absolute;
    padding: 5px;
    border-radius: 4px;
    white-space: nowrap;
    z-index: 1000;
  }
  </style>  