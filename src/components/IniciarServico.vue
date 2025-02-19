<template>
    <div class="modal" v-if="visible">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
        type: Boolean,
        default: false
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
