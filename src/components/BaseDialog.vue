<script lang="ts">
import { defineComponent } from 'vue';
import { useDialog } from 'naive-ui';

export default defineComponent({
  props: {
    title: String,
    content: String,
    positiveText: String,
    negativeText: String,
    onPositiveClick: Function,
    onNegativeClick: Function,
  },
  setup(props) {
    const dialog = useDialog();
    return {
      handleConfirm() {
        dialog.warning({
          title: props.title,
          content: props.title,
          positiveText: props.positiveText,
          negativeText: props.negativeText,
          onPositiveClick: props.onPositiveClick,
          onNegativeClick: props.onNegativeClick,
        });
      },
    };
  },
});
</script>
