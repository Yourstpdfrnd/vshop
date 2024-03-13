<template>
    <div class="a-badge">
        <span class="a-badge__mini">
            {{ count }}
        </span>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.a-badge {
    
    display: flex;
    align-items: center;
    border-radius: 16px;
    &__mini {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        background: green;
        border-radius: 50%;
    }
}

</style>