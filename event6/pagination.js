const pagination = {
	props: {
		totalPage: {
			type: Number,
			required: true
		},
		pageNumberLimit: {
			type: Number,
			default: 10
		},
		showFirstPageButton: {
			type: Boolean,
			default: true
		},
		showLastPageButton: {
			type: Boolean,
			default: true
		}
	},
	emits: ["update:current-page"],
	setup(props, { emit }) {
		const { totalPage, pageNumberLimit } = Vue.toRefs(props);
		const currentPage = Vue.ref(1);
		const api = Vue.ref(false);
		const pagination = Vue.reactive({
			maxPageNumberLimit: pageNumberLimit.value,
			minPageNumberLimit: 0
		});

		const pageMax = Vue.computed(() => totalPage.value);
		const pages = Vue.computed(() => Array.from({ length: pageMax.value }, (_, i) => i + 1));
		const pagesList = Vue.computed(() => pages.value.filter((number) => number <= pagination.maxPageNumberLimit && number > pagination.minPageNumberLimit));
		const isFirstPage = Vue.computed(() => currentPage.value === 1);
		const isLastPage = Vue.computed(() => currentPage.value === pageMax.value);

		const setPages = (newPage = 1) => {
			currentPage.value = newPage;
			const startPage = Math.floor((newPage - 1) / pageNumberLimit.value) * pageNumberLimit.value;
			pagination.minPageNumberLimit = Math.max(0, startPage);
			pagination.maxPageNumberLimit = Math.min(pageMax.value, startPage + pageNumberLimit.value);
		};

		const updatePageAndEmit = (newPage) => {
			currentPage.value = newPage;
			emit("update:current-page", newPage);
		};

		const handleClick = (page) => {
			if (!api.value) {
				updatePageAndEmit(page);
			}
		};

		const handlePrevClick = () => {
			if (!api.value && currentPage.value > 1) {
				updatePageAndEmit(currentPage.value - 1);
				if (currentPage.value < pagination.minPageNumberLimit + 1) {
					pagination.minPageNumberLimit = Math.max(0, pagination.minPageNumberLimit - pageNumberLimit.value);
					pagination.maxPageNumberLimit = pagination.minPageNumberLimit + pageNumberLimit.value;
				}
			}
		};

		const handleNextClick = () => {
			if (!api.value && currentPage.value < pageMax.value) {
				updatePageAndEmit(currentPage.value + 1);
				if (currentPage.value > pagination.maxPageNumberLimit) {
					pagination.minPageNumberLimit += pageNumberLimit.value;
					pagination.maxPageNumberLimit = Math.min(pageMax.value, pagination.maxPageNumberLimit + pageNumberLimit.value);
				}
			}
		};

		const goToFirstPage = () => {
			if (isFirstPage.value) {
				return;
			}
			updatePageAndEmit(1);
			pagination.minPageNumberLimit = 0;
			pagination.maxPageNumberLimit = Math.min(pageMax.value, pageNumberLimit.value);
		};

		const goToLastPage = () => {
			if (isLastPage.value) {
				return;
			}
			const newPage = pageMax.value;
			updatePageAndEmit(newPage);
			let startPage = pageMax.value - (pageMax.value % pageNumberLimit.value || pageNumberLimit.value);
			if (startPage === pageMax.value) {
				startPage -= pageNumberLimit.value;
			}
			pagination.minPageNumberLimit = Math.max(0, startPage);
			pagination.maxPageNumberLimit = pageMax.value;
		};
		const resetPagination = (page) => {
			setPages(page);
		};
		Vue.watchEffect(() => {
			if (totalPage.value) {
				setPages();
			}
		});
		return {
			currentPage,
			api,
			pagination,
			pagesList,
			isFirstPage,
			isLastPage,
			handleClick,
			handlePrevClick,
			handleNextClick,
			goToFirstPage,
			goToLastPage,
			resetPagination
		};
	},
	template: `
        <div class="pagination-content" v-bind="$attrs">
            <ul class="pagination-numbers" style="display:flex;list-style:none;">
                <li class="pagination-numbers__symbol" :class="{ disabled: isFirstPage }" v-if="showFirstPageButton"><span class="pagination-numbers__symbol-first" @click="goToFirstPage"><<</span></li>
                <li class="pagination-numbers__symbol" :class="{ disabled: isFirstPage }"><span class="pagination-numbers__symbol-prev" @click="handlePrevClick"><</span></li>
                <li v-for="page in pagesList" :key="page" v-memo="[page, page === currentPage]"
                    :id="page" class="pagination-numbers__item" 
                    :class="{ active: page === currentPage }" 
                    @click="handleClick(page)">
                    {{ page }}
                </li>
                <li class="pagination-numbers__symbol" :class="{ disabled: isLastPage }"><span class="pagination-numbers__symbol-next" @click="handleNextClick">></span></li>
                <li class="pagination-numbers__symbol" v-if="showLastPageButton" :class="{ disabled: isLastPage }"><span class="pagination-numbers__symbol-last" @click="goToLastPage">>></span></li>
            </ul>
        </div>
    `
};

export default pagination;
