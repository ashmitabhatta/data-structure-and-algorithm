import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-example',
  template: `
    <h1>Sort Example</h1>
    <p>Initial Data: {{ input }}</p>
    <hr />

    <div>
      <p>Selection Sort: {{ selectionSort }}</p>
      <p>Bubble Sort: {{ bubbleSort }}</p>
      <p>Insertion Sort: {{ insertionSort }}</p>
      <p>Merge Sort: {{ mergeSort }}</p>
    </div>
  `,
})
export class SortExample implements OnInit {
  input = [11, 42, 12, 49, 98, 23, 7, 10];

  selectionSort: number[] = [];
  bubbleSort: number[] = [];
  insertionSort: number[] = [];
  mergeSort: number[] = [];

  ngOnInit(): void {
    this.selectionSort = this.#selectionSort(this.input);
    this.bubbleSort = this.#bubbleSort(this.input);
    this.insertionSort = this.#insertionSort(this.input);
    this.mergeSort = this.#mergeSort(this.input);
  }

  /**
   * Selection Sort
   * @param data Initial unsorted array
   * @returns Sorted Array
   * Time complexity (Worst Case): O(n2)
   */
  #selectionSort(data: number[]): number[] {
    const arr = [...data];
    for (let i = 0; i < arr.length - 1; i++) {
      let iMin = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[iMin]) {
          iMin = j;
        }
      }
      this.#swapElements(arr, i, iMin);
    }
    return arr;
  }

  /**
   * Bubble Sort
   * @param data Initial unsorted array
   * @returns Sorted Array
   * Time complexity (Worst Case): O(n2)
   */
  #bubbleSort(data: number[]): number[] {
    const arr = [...data];
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          this.#swapElements(arr, j, j + 1);
        }
      }
    }
    return arr;
  }

  /**
   * Insertion Sort
   * @param data Initial unsorted array
   * @returns Sorted Array
   * Time complexity (Worst Case): O(n2)
   */
  #insertionSort(data: number[]): number[] {
    const arr = [...data];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && key < arr[j]) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = key;
    }
    return arr;
  }

  /**
   * Merge Sort
   * @param data Initial unsorted array
   * @returns Sorted Array
   * Time complexity (Worst Case): O(nlogn)
   */
  #mergeSort(data: number[]): number[] {
    // debugger;
    const arr = [...data];
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return this.#merge(this.#mergeSort(left), this.#mergeSort(right));
  }

  #merge(leftArr: number[], rightArr: number[]): number[] {
    debugger;
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      console.log({
        leftIndex, rightIndex, leftArr, rightArr, result
      })
      if (leftArr[leftIndex] <= rightArr[rightIndex]) {
        result.push(leftArr[leftIndex]);
        leftIndex++;
      } else {
        result.push(rightArr[rightIndex]);
        rightIndex++;
      }
    }

    while (leftIndex < leftArr.length) {
      result.push(leftArr[leftIndex]);
      leftIndex++;
    }

    while (rightIndex < rightArr.length) {
      result.push(rightArr[rightIndex]);
      rightIndex++;
    }
    return result;
  }

  #swapElements(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
