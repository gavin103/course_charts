<template>
<div class="Chart">
      <h1 style="text-align:center;">线上学生学习人数</h1>
      <line-example>
      </line-example>
      <h1 style="text-align:center;">总报名人数</h1>
      <line-all>
      </line-all>
</div>
</template>
<script>
  import LineExample from './LineExample';
  import LineAll from './LineAll';
 export default{
    components: {
      LineExample,
      LineAll
    }
  }

</script>
<style>
  .container {
    max-width: 500px;
    margin: 0 auto;
  }

  h1 {
    color:white;
    font-family: 'Helvetica', Arial;
    text-transform: uppercase;
    border-bottom: 1px solid #323d54;
    padding-bottom: 15px;
    font-size: 28px;
    margin-top: 0;
  }

  .Chart {
    background: #212733;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin:  25px 0;
  }
</style>
