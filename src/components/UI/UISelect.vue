<template>
    <div class="select" ref="selectRef">
        <div class="visible-part" @click="opened = !opened">
            <span>{{ selected?.title || placeholder }}</span>
            <svg :class="{ 'reversed': opened }" xmlns="http://www.w3.org/2000/svg" width="10" height="6"
                viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="#2E3640" stroke-linecap="round" />
            </svg>
        </div>
        <div class="elements-list" v-if="opened">
            <div class="element" v-for="item in items" @click="select(item)"
                :class="{ 'selected': selected?.value == item.value }">
                {{ item.title }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, PropType } from 'vue';

interface ISelect {
    title: string;
    value: string;
}

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    placeholder: String,
    items: Array as PropType<ISelect[]>,
    selected: Object as PropType<ISelect>
});

const selected = ref<ISelect>({
    title: '',
    value: ''
});
const selectRef = ref(null);
const opened = ref(false);

const select = (item: ISelect) => {
    selected.value = item;
    opened.value = false;

    emit('update:modelValue', item.value);
};

onMounted(() => {
    if (props.selected) {
        selected.value = props.selected;
    }

    document.addEventListener('click', (e: any) => {
        let el = e.target;
        const nodes = [];
        nodes.push(el);

        while (el) {
            nodes.unshift(el.parentNode);
            el = el.parentNode;
        }

        const hasWrapper = nodes.reduce((res, element) => {
            return res || element === selectRef.value;
        }, false);

        if (!hasWrapper) {
            opened.value = false;
        }
    });
});
</script>

<style scoped>
.select {
    user-select: none;
    width: -webkit-fill-available;
    height: 34px;
    background: #4b4050;
    border-radius: 3px;
    border: 1px solid #332e3f;
    color: white;
    position: relative;
    cursor: pointer;
}

.visible-part {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    svg.reversed {
        transform: rotate(180deg);
    }
}

.elements-list {
    box-sizing: border-box;
    width: 100%;
    padding: 2px;
    border: 1px solid #332e3f;
    background: #4b4050;
    box-shadow: 3px 3px 16px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    position: absolute;
    z-index: 100;
    top: 36px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 300px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0px;
    }

    .element {
        background: #403644;
        border-radius: 2px;
        padding: 4px 6px;

        &:hover {
            background: #302933;
        }

        &.selected {
            background: #302933;
        }
    }
}
</style>
