import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  title = "Product List";

  products = [];
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('http://localhost:5555/products')
    .subscribe((response) => {
      this.products = response.json();
    });
  }

  deleteProduct = (id, index) => {
    if (confirm("Are you sure?")) {
      const url = `${"http://localhost:5555/products"}/${id}`;
      return this.http.delete(url, {
        headers: this.headers
      }).toPromise().then(() => {
        this.products.splice(index, 1);
      });
    }
  }
}
